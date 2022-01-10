import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import useOnScrolled from "../hooks/useOnScrolled";
import { useState } from "react";
import { useRouter } from "next/router";

import Loading from "./Loading";

function Header() {
  const router = useRouter();
  const scrolled = useOnScrolled();
  const [menu, setMenu] = useState(false);
  const { data: session } = useSession();
  const [isSearching, setIsSearching] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value && !isSearching) {
      setIsSearching(true);
      setMenu(false);
      router.push("/search/" + e.target.value);
      e.target.value = "";
    }
  };

  const links = [
    {
      name: "HOME",
      linkUrl: "/",
    },
    {
      name: "MOVIE",
      linkUrl: "/list/6/1",
    },
    {
      name: "TV SHOW",
      linkUrl: "/list/13/1",
    },
    {
      name: "REALITY SHOW",
      linkUrl: "/list/26/1",
    },
    {
      name: "ANIME",
      linkUrl: "/list/31/1",
    },
  ];

  return (
    <div
      className={`flex justify-center top-0 fixed w-full h-16 z-10 bg-gradient-to-b from-gray-900 to-transparent transition duration-1000 ${
        scrolled ? "bg-black" : ""
      }`}
    >
      {/* Loading spinner */}
      <Loading isLoading={isSearching} setIsLoading={setIsSearching} />

      <div className="max-w-screen-2xl flex grow justify-between items-center h-16 px-2 sm:px-6 md:px-10 lg:px-14">
        {/* Logo */}
        <div>
          <Link href="/">
            <img
              src="/logo.png"
              alt="logo"
              className="h-9 object-contain cursor-pointer ml-0 py-[0.4em] px-2"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div
          className={`absolute lg:relative w-screen lg:w-fit h-screen left-0 top-0 lg:h-6 lg:block flex flex-col transition-all duration-200 bg-black/90 lg:bg-transparent ${
            menu ? "flex justify-center items-center" : "hidden"
          }`}
        >
          {links.map((link) => (
            <Link href={link.linkUrl} key={link.name}>
              <a
                onClick={() => setMenu(false)}
                className={`
              hover:text-white
              transition
              duration-300
              font-medium
              p-2
              xl:p-3
              mt-6 md:mt-0
              text-4xl md:text-4xl lg:text-base
              ${router.asPath == link.linkUrl ? "text-white" : "text-gray-400"}
            `}
              >
                {link.name}
              </a>
            </Link>
          ))}
        </div>

        {/* <!-- Search input on desktop screen --> */}
        <div
          className={`mx-0 md:block md:translate-x-6 ${
            menu ? "block" : "hidden"
          }`}
        >
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>

            <input
              type="text"
              className="mr-[8vw] sm:mr-[11vw] lg:mr-0 w-64 lg:w-40 xl:w-60 py-1 pl-10 text-white bg-black border border-white focus:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-red"
              placeholder="Search"
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        {/* Auth components */}
        <div className="hidden lg:block">
          {session ? (
            <div className="flex gap-2 items-center">
              <img
                onClick={() => signOut()}
                className="inline-block h-10 w-10 rounded-full"
                src={session.user.image}
                alt=""
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="text-black border border-white px-4 py-1 bg-white transition-colors duration-200 hover:bg-black hover:text-white "
            >
              Sign in
            </button>
          )}
        </div>

        {/* <!-- Mobile menu button --> */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="text-white p-4 hover:text-gray-600 focus:outline-none focus:text-white z-10"
            aria-label="toggle menu"
            onClick={() => setMenu(!menu)}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
