import Link from "next/link";

import RegistrationForm from "../../../components/(auth)/RegistrationForm";

export default function Page() {
  // TODO: Check for price_id in search parameters, send user to checkout after signup. Otherwise user will need to select plan while in the dashboard

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="https://trpkit.com/branding/icon.svg"
          alt="Trpkit"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Create an account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <RegistrationForm />
        <p className="mt-10 text-center text-sm text-gray-400">
          Already a member?{" "}
          <Link href="/login" className="font-semibold leading-6 text-blue-400 hover:text-blue-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
