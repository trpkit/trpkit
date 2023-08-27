"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import React, { useState } from "react";

import ErrorNotification from "./ErrorNotification";

export default function RegistrationForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [revealPassword, setRevealPassword] = useState<boolean>(false);
  const [revealRepeatPassword, setRevealRepeatPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Validate inputs with zod

    // TODO: Create client and server objects for registration

    // TODO: Send request to API with server objects

    // TODO: Check for errors from API response

    // TODO: Create encrypted store

    // TODO: Store client objects in encrypted store

    // TODO: Show recovery code/key for user to download/view/print

    // Redirect to dashboard
    await router.push("/");
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {errors.length !== 0 && <ErrorNotification errors={errors} />}
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
          Email address
        </label>
        <div className="mt-2">
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
          Password
        </label>
        <div className="mt-2 relative">
          <input
            type={revealPassword ? "text" : "password"}
            id="password"
            name="password"
            autoComplete="new-password"
            required
            value={password}
            minLength={8}
            maxLength={64}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 pr-10 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {revealPassword ? (
              <EyeSlashIcon
                className="h-5 w-5 cursor-pointer text-gray-400"
                aria-hidden={true}
                onClick={() => setRevealPassword(!revealPassword)}
              />
            ) : (
              <EyeIcon
                className="h-5 w-5 cursor-pointer text-gray-400"
                aria-hidden={true}
                onClick={() => setRevealPassword(!revealPassword)}
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="repeatPassword" className="block text-sm font-medium leading-6 text-white">
          Repeat password
        </label>
        <div className="relative mt-2">
          <input
            type={revealRepeatPassword ? "text" : "password"}
            id="repeatPassword"
            name="repeatPassword"
            autoComplete="new-password"
            required
            value={repeatPassword}
            minLength={8}
            maxLength={64}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 pr-10 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {revealRepeatPassword ? (
              <EyeSlashIcon
                className="h-5 w-5 cursor-pointer text-gray-400"
                aria-hidden={true}
                onClick={() => setRevealRepeatPassword(!revealRepeatPassword)}
              />
            ) : (
              <EyeIcon
                className="h-5 w-5 cursor-pointer text-gray-400"
                aria-hidden={true}
                onClick={() => setRevealRepeatPassword(!revealRepeatPassword)}
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-start">
          <div className="flex-h-6 items-center">
            <input
              type="checkbox"
              id="recoveryNotice"
              name="recoveryNotice"
              className="h-4 w-4 rounded border-white/10 bg-white/5 py-1.5 text-blue-400"
            />
          </div>
          <label
            htmlFor="recoveryNotice"
            className="ml-3 block flex-1 text-sm leading-6 text-white">
            I agree that if{" "}
            <strong className="font-semibold">I lose my password, I may lose my data</strong>.
          </label>
        </div>
      </div>
      <div>
        <div className="flex items-start">
          <div className="flex h-6 items-center">
            <input
              type="checkbox"
              id="legalNotice"
              name="legalNotice"
              className="h-4 w-4 rounded border-white/10 bg-white/5 py-1.5 text-blue-400"
            />
          </div>
          <label htmlFor="legalNotice" className="ml-3 block flex-1 text-sm leading-6 text-white">
            I agree to the{" "}
            <a href="#" className="font-semibold leading-6 text-blue-400 hover:text-blue-300">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="font-semibold leading-6 text-blue-400 hover:text-blue-300">
              Privacy Policy
            </a>
            .
          </label>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
          Create account
        </button>
      </div>
    </form>
  );
}
