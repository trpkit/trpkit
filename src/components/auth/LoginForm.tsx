"use client";

import * as opaque from "@serenity-kit/opaque";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [wasmLoaded, setWasmLoaded] = useState<boolean>(false);

  useEffect(() => {
    opaque.ready.then(() => setWasmLoaded(true));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { clientLoginState, startLoginRequest } = opaque.client.startLogin({ password });

      const startRes = await fetch("/api/auth/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          op: 0,
          d: { identifier: email, request: startLoginRequest },
        }),
      });

      if (!startRes.ok) {
        const err = await startRes.text();
        throw new Error(err);
      }

      const { res: loginResponse } = await startRes.json();

      const { finishLoginRequest, sessionKey, exportKey, serverStaticPublicKey } =
        opaque.client.finishLogin({
          clientLoginState,
          loginResponse,
          password,
          // TODO look at comments in RegisterForm.tsx about keyStretching options
          keyStretching: "memory-constrained",
        });

      if (serverStaticPublicKey !== process.env.NEXT_PUBLIC_OPAQUE_PUBLIC_KEY) {
        // TODO need better message (user possibly compromised)
        throw new Error("Failed to verify server public key.");
      }

      const finishRes = await fetch("/api/auth/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          op: 1,
          d: { identifier: email, request: finishLoginRequest },
        }),
      });

      if (!finishRes.ok) {
        const err = await finishRes.text();
        throw new Error(err);
      }

      // TODO handle session key, export key (master key)

      router.push("/dashboard");
    } catch (err) {
      // TODO need better message
      setError(err.message || "Failed to submit login, please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid w-full max-w-sm grid-cols-1 gap-8">
      <h1>Sign in to your account</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
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
          autoComplete="current-password"
          required
          disabled={isLoading}
        />
      </div>
      <button type="submit" disabled={!wasmLoaded || isLoading}>
        Login
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
