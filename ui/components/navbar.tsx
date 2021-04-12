import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav className="flex items-center flex-wrap bg-gray-700 p-3">
        <Link href="/">
          <a className="inline-flex items-center p-2 mr-10">
            <img
              src="/paste.png"
              className="h-8 w-8 mr-2"
              alt="Copy and Paste Logo"
            ></img>
            <span className="text-xl text-white font-bold uppercase tracking-wide">
              Paste.sysnomid.com
            </span>
          </a>
        </Link>
        <button className=" inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none"></button>
        <div className="hidden w-full lg:inline-flex lg:flex-grow lg:w-auto">
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
            <Link href="/">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-blue-600 hover:text-white">
                New Paste
              </a>
            </Link>
            <Link href="/about">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-blue-600 hover:text-white">
                About
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
