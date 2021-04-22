import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="flex items-center flex-wrap bg-gray-700 p-3 mb-96 shadow-3xl">
        <Link href="/">
          <a className="inline-flex items-center p-2 mr-10">
            <span className="text-xl text-white font-bold uppercase tracking-wide">
              &copy; Sysnomid {new Date().getFullYear()}
            </span>
          </a>
        </Link>
        <div className="w-full lg:inline-flex lg:flex-grow lg:w-auto">
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
            <Link href="https://sysnomid.com">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-blue-600 hover:text-white">
                sysnomid.com
              </a>
            </Link>
            <a
              href="https://github.com/Sysnomid/paste"
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-blue-600 hover:text-white"
            >
              Source Code
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
