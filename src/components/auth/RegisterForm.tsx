"use client";

import * as opaque from "@serenity-kit/opaque";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    opaque.ready;
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { registrationRequest, clientRegistrationState } = opaque.client.startRegistration({
        password,
      });

      const startRes = await fetch("/api/auth/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          op: 0,
          d: { identifier: email, request: registrationRequest },
        }),
      });

      if (!startRes.ok) {
        const err = await startRes.text();
        throw new Error(err);
      }

      const { res: registrationResponse } = await startRes.json();

      const { registrationRecord, serverStaticPublicKey } = opaque.client.finishRegistration({
        password,
        registrationResponse,
        clientRegistrationState,
        // TODO look at keyStretching options before going live
        //  memory-constrained (2^16 - 64MiB, 3t, 4p) supposedly takes ~1 second
        //  rfc-draft-recommended (2^21-1 - 2048MiB, 1t, 4p) supposedly takes ~13 seconds
        //  potentially look at providing custom values around 2^17-2^19 range (will need to benchmark)
        keyStretching: "memory-constrained",
      });

      if (serverStaticPublicKey !== process.env.NEXT_PUBLIC_OPAQUE_PUBLIC_KEY) {
        // TODO need better message (user possibly compromised)
        throw new Error("Failed to verify server public key.");
      }

      const finishRes = await fetch("/api/auth/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          op: 1,
          d: { identifier: email, request: registrationRecord },
        }),
      });

      if (!finishRes.ok) {
        const err = await finishRes.text();
        throw new Error(err);
      }

      router.push("/auth/login");
    } catch (err) {
      // TODO need better message
      setError(err.message || "Failed to submit registration, please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="new-password"
          required
          disabled={isLoading}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        Register
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
