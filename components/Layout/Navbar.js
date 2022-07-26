import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import useOnScrolled from "../../hooks/useOnScrolled";
import { useState } from "react";
import { useRouter } from "next/router";

import Loading from "./Loading";
import { MAJORS } from "../../utils/const";
import ThemeSwitcher from "components/ThemeSwitcher";

function Navbar() {
  const router = useRouter();
  const scrolled = useOnScrolled();
  const [menu, setMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { data: session } = useSession();
  const [isSearching, setIsSearching] = useState(false);
  const [theme, setTheme] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value && !isSearching) {
      handleSearching(e);
      e.target.value = "";
    }
  };
  const handleSearching = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setMenu(false);
    router.push("/search/" + searchText);
  };

  const setThemeForLogo = (theme) => {
    setTheme(theme);
  };
  // useEffect(() => {}, theme);

  return (
    <nav
      className={`fixed top-0 z-30 flex h-12 w-full justify-center transition duration-500 lg:h-16 ${
        scrolled ? "bg-base-200/95" : "bg-base-100/50"
      }`}
    >
      {/* Loading spinner */}
      <Loading isLoading={isSearching} setIsLoading={setIsSearching} />

      <ol className="flex max-w-screen-2xl grow items-center justify-end px-1 sm:px-4 md:px-8 lg:justify-between lg:px-14">
        {/* Logo */}
        <li className="z-30 grow">
          <Link href="/">
            <a className="ml-0 block w-32 cursor-pointer py-1 px-2 duration-100 hover:scale-110 active:scale-110 lg:w-36">
              {theme ? (
                <img
                  data-theme="dark"
                  src="/logo_white.png"
                  alt="logo"
                  className="object-contain"
                />
              ) : (
                <img
                  data-theme="light"
                  src="/logo_black.png"
                  alt="logo"
                  className="object-contain"
                />
              )}
            </a>
          </Link>
        </li>

        {/* Navigation Links */}
        <li
          className={`absolute left-0 top-0 flex h-screen w-screen flex-col bg-base-300/90 transition-all duration-200 lg:relative lg:block lg:h-6 lg:w-fit lg:grow lg:bg-transparent ${
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
              duration-300 hover:text-secondary-focus
              md:mt-0 md:text-4xl lg:text-base
              xl:p-3
              ${
                router.asPath == "/"
                  ? "border-b border-secondary text-secondary-focus"
                  : ""
              }
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
              duration-300 hover:text-secondary-focus
              md:mt-0 md:text-4xl lg:text-base
              xl:p-3
              ${
                router.query.type == link.type
                  ? "border-b border-secondary text-secondary-focus"
                  : ""
              }
            `}
              >
                {link.classify}
              </a>
            </Link>
          ))}
          <Link href={`/mylist`}>
            <a
              onClick={() => setMenu(false)}
              className={`
              mt-6
              p-2
              text-4xl
              font-medium
              uppercase
              transition
              duration-300 hover:text-secondary-focus
              md:mt-0 md:text-4xl lg:text-base
              xl:p-3
              ${
                router.asPath == "/mylist"
                  ? "border-b border-secondary text-secondary-focus"
                  : ""
              }
            `}
            >
              my list
            </a>
          </Link>
        </li>

        {/* <!-- Search input on desktop screen --> */}
        <li className={`mr-2 ml-1 sm:ml-4 md:block lg:mx-0 `}>
          <div className="form-control">
            <label className="input-group input-group-sm">
              <input
                type="search"
                placeholder="Search…"
                className="input input-bordered input-sm w-28 sm:w-auto lg:w-28"
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="btn btn-square btn-sm"
                onClick={handleSearching}
              >
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
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </label>
          </div>
        </li>

        {/* Theme color switcher */}
        <ThemeSwitcher setThemeForLogo={setThemeForLogo} />

        {/* Auth components */}
        <li className="hidden md:block">
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
              className="btn btn-secondary btn-sm"
            >
              Sign in
            </button>
          )}
        </li>

        {/* <!-- Mobile icon menu button --> */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="z-20 p-4 hover:text-gray-600 focus:text-secondary focus:outline-none"
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
      </ol>
    </nav>
  );
}

export default Navbar;
