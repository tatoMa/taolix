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
  const [searchText, setSearchText] = useState("");
  const { data: session } = useSession();
  const [isSearching, setIsSearching] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value && !isSearching) {
      handleSearching(e.target.value);
      e.target.value = "";
    }
  };
  const handleSearching = (text) => {
    setIsSearching(true);
    setMenu(false);
    router.push("/search/" + text);
  };

  return (
    <div
      className={`fixed top-0 z-30 flex h-16 w-full justify-center bg-gradient-to-b from-black to-transparent transition duration-1000 ${
        scrolled ? "bg-black" : ""
      }`}
    >
      {/* Loading spinner */}
      <Loading isLoading={isSearching} setIsLoading={setIsSearching} />

      <div className="flex h-16 max-w-screen-2xl grow items-center justify-between px-1 sm:px-6 md:px-10 lg:px-14">
        {/* Logo */}
        <div className="z-30">
          <Link href="/">
            <a className="ml-0 block w-32 cursor-pointer py-[0.4em] px-2 duration-100 hover:scale-110 active:scale-110 lg:w-40">
              <img src="/logo.png" alt="logo" className="object-contain" />
            </a>
          </Link>
        </div>

        {/* Navigation Links */}
        <div
          className={`absolute left-0 top-0 flex h-screen w-screen flex-col bg-black/90 transition-all duration-200 lg:relative lg:block lg:h-6 lg:w-fit lg:bg-transparent ${
            menu
              ? "flex animate-[animation-fade-in_0.3s_ease-in-out] items-center justify-center"
              : "hidden"
          }`}
        >
          <Link href={`/`}>
            <a
              onClick={() => setMenu(false)}
              className={`
              mt-6
              p-2
              text-4xl
              font-medium
              uppercase
              transition
              duration-300 hover:text-white
              md:mt-0 md:text-4xl lg:text-base
              xl:p-3
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
              mt-6
              p-2
              text-4xl
              font-medium
              uppercase
              transition
              duration-300 hover:text-white
              md:mt-0 md:text-4xl lg:text-base
              xl:p-3
              ${router.query.type == link.type ? "text-white" : "text-gray-400"}
            `}
              >
                {link.classify}
              </a>
            </Link>
          ))}
        </div>

        {/* <!-- Search input on desktop screen --> */}
        <div className={`mr-2 ml-4  md:block md:translate-x-6 lg:mx-0 `}>
          <div className="relative flex">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-400"
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
              className="focus:ring-red w-full border border-white bg-black py-1 pl-10 text-white focus:border-red-500 focus:outline-none dark:focus:border-red-500 sm:mr-[11vw] lg:mr-0 lg:w-40 xl:w-60"
              placeholder="Search"
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <a
                className="absolute right-2 hidden p-1 lg:block"
                onClick={() => handleSearching(searchText)}
                href=""
              >
                ↩
              </a>
            )}
          </div>
        </div>

        {/* Auth components */}
        <div className="hidden lg:block">
          {session ? (
            <div className="flex items-center gap-2">
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
              className="border border-white bg-white px-4 py-1 text-black transition-colors duration-200 hover:bg-black hover:text-white "
            >
              Sign in
            </button>
          )}
        </div>

        {/* <!-- Mobile menu button --> */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="z-20 p-4 text-white hover:text-gray-600 focus:text-white focus:outline-none"
            aria-label="toggle menu"
            onClick={() => setMenu(!menu)}
          >
            {!menu ? (
              <svg
                viewBox="0 0 24 24"
                className="z-30 h-6 w-6 animate-[animation-fade-in2_0.3s_ease-in-out] fill-current"
              >
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            ) : (
              <svg
                className="z-30 h-6 w-6 animate-[animation-fade-in_0.3s_ease-in-out] fill-current"
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
