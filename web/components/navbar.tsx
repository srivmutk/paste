import Link from "next/link";
import React from "react";

interface NavbarProps {
  link: string;
  sm: boolean;
  children: React.ReactNode;
}

const NavbarItem = ({ link, sm, children }: NavbarProps) => {
  return (
    <>
      {sm && (
        <>
          <Link href={link}>
            <a className="p-2 rounded bg-gray-600 mb-2">{children}</a>
          </Link>
        </>
      )}
      {!sm && (
        <>
          <Link href={link}>
            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 mr-2 rounded text-white font-bold items-center justify-center bg-gray-600 hover:bg-blue-600 hover:text-white">
              {children}
            </a>
          </Link>
        </>
      )}
    </>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <nav className="flex flex-wrap bg-gray-700 p-3 shdaow-3xl">
        <Link href="/">
          <a className="inline-flex items-center p-2">
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
        <button
          className="flex ml-2 mt-2 mb-2 bg-gray-600 shadow-2xl w-full visible p-2 rounded lg:hidden text-white hover:text-white outline-none"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {!isOpen && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
          {isOpen && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
        {isOpen && (
          <div className="block rounded w-full">
            <div className="flex flex-col lg:hidden xl:hidden pb-3 pt-3 pr-3 pl-3">
              <NavbarItem link="/" sm={true}>
                <a className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="fill-current text-white w-8 pr-2"
                  >
                    <path d="M6 34.5v7.5h7.5l22.13-22.13-7.5-7.5-22.13 22.13zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z" />
                    <path d="M0 0h48v48h-48z" fill="none" />
                  </svg>
                  New Paste
                </a>
              </NavbarItem>
              <NavbarItem link="/about" sm={true}>
                About
              </NavbarItem>
            </div>
          </div>
        )}
        <div className="hidden w-full md:hidden lg:inline-flex lg:flex-grow lg:w-auto">
          <div className="md:hidden lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
            <NavbarItem link="/" sm={false}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="fill-current text-white w-8 pr-2"
              >
                <path d="M6 34.5v7.5h7.5l22.13-22.13-7.5-7.5-22.13 22.13zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z" />
                <path d="M0 0h48v48h-48z" fill="none" />
              </svg>
              New Paste
            </NavbarItem>
            <NavbarItem link="/about" sm={false}>
              About
            </NavbarItem>
          </div>
        </div>
      </nav>
    </>
  );
}
