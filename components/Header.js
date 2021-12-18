import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import useOnScrolled from "../hooks/useOnScrolled";
import { useState } from "react";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const [menu, setMenu] = useState(false);

  const scrolled = useOnScrolled();

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setMenu(false);
      router.push("/search/" + e.target.value);
    }
  };

  return (
    <div
      className={`flex justify-center top-0 fixed w-full h-16 z-10 bg-gradient-to-b from-gray-900 to-transparent transition duration-1000 ${
        scrolled ? "bg-black" : ""
      }`}
    >
      <div className="max-w-screen-2xl flex grow justify-between items-center h-16 px-2 sm:px-6 md:px-10 lg:px-14">
        {/* Logo */}
        <div>
          <Link href="/">
            <img
              src="/logo.png"
              alt="logo"
              className="h-9 object-contain cursor-pointer ml-3 md:ml-0 p-2"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div
          className={`absolute lg:relative w-screen lg:w-fit h-screen left-0 top-0 lg:h-6 lg:block flex flex-col transition-all duration-200 bg-black/90 lg:bg-transparent ${
            menu ? "flex justify-center items-center" : "hidden"
          }`}
        >
          <Link href="/">
            <a
              onClick={() => setMenu(false)}
              className="
              hover:text-white
              font-netflix_medium
              transition
              duration-300
              text-white
              p-3
              mt-20 md:mt-0
              text-4xl md:text-4xl lg:text-sm
            "
            >
              HOME
            </a>
          </Link>
          <Link href={`/list/?t=6`}>
            <a
              onClick={() => setMenu(false)}
              className="
              hover:text-white
              font-netflix_medium
              transition
              duration-300
              text-gray-400
              p-3
              mt-6 md:mt-0
              text-4xl md:text-4xl lg:text-sm
            "
            >
              MOVIE
            </a>
          </Link>
          <Link href={`/list/?t=16`}>
            <a
              onClick={() => setMenu(false)}
              className="
              hover:text-white
              font-netflix_medium
              transition
              duration-300
              text-gray-400
              p-3
              mt-6 md:mt-0
              text-4xl md:text-4xl lg:text-sm
            "
            >
              TV SHOW
            </a>
          </Link>
          <Link href={`/list/?t=27`}>
            <a
              onClick={() => setMenu(false)}
              className="
              hover:text-white
              font-netflix_medium
              transition
              duration-300
              text-gray-400
              p-3
              mt-6 md:mt-0
              text-4xl md:text-4xl lg:text-sm
            "
            >
              REALITY SHOW
            </a>
          </Link>
          <Link href={`/list/?t=31`}>
            <a
              onClick={() => setMenu(false)}
              className="
              hover:text-white
              font-netflix_medium
              transition
              duration-300
              text-gray-400
              p-3
              mt-6 md:mt-0
              text-4xl md:text-4xl lg:text-sm
            "
            >
              ANIME
            </a>
          </Link>
        </div>

        {/* <a
          onClick={() => router.back()}
          className="block lg:hidden absolute left-0 top-10 text-white p-5 pl-2 hover:text-gray-600 focus:outline-none focus:text-white z-10
            "
        >
          {"< Back"}
        </a> */}

        {/* <!-- Search input on desktop screen --> */}
        <div
          className={`mx-0 md:block md:translate-x-28 ${
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
              className="w-64 lg:w-full py-1 pl-10 text-white bg-black border border-white focus:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-red"
              placeholder="Search"
              onKeyDown={_handleKeyDown}
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
