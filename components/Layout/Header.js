import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import useOnScrolled from "../../hooks/useOnScrolled";
import { useState } from "react";
import { useRouter } from "next/router";

import Loading from "./Loading";
import { MAJORS } from "../../utils/const";

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
      linkUrl: "/list/2/1",
    },
    {
      name: "TV SHOW",
      linkUrl: "/list/15/1",
    },
    {
      name: "REALITY SHOW",
      linkUrl: "/list/22/1",
    },
    {
      name: "ANIME",
      linkUrl: "/list/28/1",
    },
  ];

  return (
    <div
      className={`flex justify-center top-0 fixed w-full h-16 z-30 bg-gradient-to-b from-black to-transparent transition duration-1000 ${
        scrolled ? "bg-black" : ""
      }`}
    >
      {/* Loading spinner */}
      <Loading isLoading={isSearching} setIsLoading={setIsSearching} />

      <div className="max-w-screen-2xl flex grow justify-between items-center h-16 px-1 sm:px-6 md:px-10 lg:px-14">
        {/* Logo */}
        <div className="z-30">
          <Link href="/">
            <a className="block w-32 lg:w-40 cursor-pointer hover:scale-110 active:scale-110 duration-100 ml-0 py-[0.4em] px-2">
              <img src="/logo.png" alt="logo" className="object-contain" />
            </a>
          </Link>
        </div>

        {/* Navigation Links */}
        <div
          className={`absolute lg:relative w-screen lg:w-fit h-screen left-0 top-0 lg:h-6 lg:block flex flex-col transition-all duration-200 bg-black/90 lg:bg-transparent ${
            menu
              ? "flex justify-center items-center animate-[animation-fade-in_0.3s_ease-in-out]"
              : "hidden"
          }`}
        >
          <Link href={`/`}>
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
              uppercase
              ${router.asPath == "/" ? "text-white" : "text-gray-400"}
            `}
            >
              home
            </a>
          </Link>
          {MAJORS.map((link) => (
            <Link href={`/list/${link.type}/1`} key={link.type}>
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
              uppercase
              ${router.query.type == link.type ? "text-white" : "text-gray-400"}
            `}
              >
                {link.classify}
              </a>
            </Link>
          ))}
        </div>

        {/* <!-- Search input on desktop screen --> */}
        <div className={`mr-2 ml-4 lg:mx-0 md:block md:translate-x-6 `}>
          <div className="relative flex">
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
              className="sm:mr-[11vw] lg:mr-0 w-full lg:w-40 xl:w-60 py-1 pl-10 text-white bg-black border border-white focus:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-red"
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
            className="text-white p-4 hover:text-gray-600 focus:outline-none focus:text-white z-20"
            aria-label="toggle menu"
            onClick={() => setMenu(!menu)}
          >
            {!menu ? (
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current animate-[animation-fade-in2_0.3s_ease-in-out] z-30"
              >
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6 fill-current animate-[animation-fade-in_0.3s_ease-in-out] z-30"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 18L18 6M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
