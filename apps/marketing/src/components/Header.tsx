import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="max-w-screen-2xl mx-auto w-full px-5 flex items-center justify-between p-6">
        <div className="flex flex-1" />
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Trpkit</span>
          <img src="/branding/logo.svg" alt="Trpkit" className="h-10 w-auto" />
        </Link>
        <div className="flex flex-1 justify-end" />
      </nav>
    </header>
  );
}
