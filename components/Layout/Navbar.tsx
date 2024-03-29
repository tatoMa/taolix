import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import useOnScrolled from "../../hooks/useOnScrolled";
import { useState } from "react";
import { useRouter } from "next/router";
import { MAJORS } from "../../utils/const";
import ThemeSwitcher from "components/ThemeSwitcher";

function Navbar() {
  const router = useRouter();
  const scrolled = useOnScrolled();
  const [menu, setMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { data: session } = useSession();
  const [theme, setTheme] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value) {
      e.target.value = "";
      setSearchText("");
      handleSearching(e);
    }
  };

  const handleSearching = (e) => {
    e.preventDefault();
    setMenu(false);
    if (searchText.length > 0) router.push("/search/" + searchText);
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-30 flex h-12 w-screen justify-center transition duration-500 lg:h-16 ${
        scrolled ? "bg-base-200/95" : "bg-base-100/50"
      }`}
    >
      <section className="flex items-center justify-end mx-2 max-w-screen-2xl grow sm:mx-6 md:mx-10 lg:mx-14 lg:justify-between ">
        {/* Logo */}
        <section className="z-30 grow">
          <Link href="/">
            <a className="relative inline-block px-1 py-0 ml-0 text-lg font-medium tracking-widest transition duration-200 bg-transparent cursor-pointer group text-accent-content outline outline-1 hover:outline-secondary active:outline-secondary sm:text-2xl">
              <div className="text-accent-content group-hover:animate-[logo_0.3s_1] group-hover:text-secondary group-active:animate-[logo_0.3s_1] group-active:text-secondary">
                TAOLIX
              </div>
            </a>
          </Link>
        </section>

        {/* Navigation Links */}
        <section
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
              border-secondary
              p-2
              text-4xl
              font-medium
              uppercase
              transition duration-300  hover:text-secondary-focus active:text-secondary-focus
              md:mt-0 md:text-4xl lg:text-base
              xl:p-3
              ${
                router.asPath === "/"
                  ? "border-b-2 border-secondary text-secondary"
                  : "text-accent-content"
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
              border-secondary
              p-2
              text-4xl
              font-medium
              uppercase
              transition duration-300  hover:text-secondary-focus active:text-secondary-focus
              md:mt-0 md:text-4xl lg:text-base
              xl:p-3
              ${
                router.query.type === link.type.toString()
                  ? "border-b-2 border-secondary text-secondary"
                  : "text-accent-content"
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
              border-secondary
              p-2
              text-4xl
              font-medium
              uppercase
              transition duration-300  hover:text-secondary-focus active:text-secondary-focus
              md:mt-0 md:text-4xl lg:text-base
              xl:p-3
              ${
                router.asPath === "/mylist"
                  ? "border-b-2 border-secondary text-secondary"
                  : "text-accent-content"
              }
            `}
            >
              my list
            </a>
          </Link>
        </section>

        {/* <!-- Search input on desktop screen --> */}
        <section className={`form-control z-50 mx-2 md:mx-1`}>
          <label className="input-group input-group-sm">
            <input
              type="search"
              placeholder="Search…"
              className="input input-bordered input-sm w-full max-w-[9rem] lg:max-w-[9.1rem] xl:max-w-[10rem]"
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="btn btn-outline btn-square btn-sm"
              onClick={handleSearching}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
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
        </section>

        {/* Theme color switcher */}
        <ThemeSwitcher theme={theme} setTheme={setTheme} />

        {/* Auth components */}
        <section className="hidden md:block">
          {session ? (
            <div className="flex items-center gap-2">
              <img
                onClick={() => signOut()}
                className="inline-block w-10 h-10 rounded-full"
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
        </section>

        {/* <!-- Mobile icon menu button --> */}
        <section className="flex lg:hidden">
          <button
            type="button"
            className="z-20 p-2 hover:text-gray-600 focus:text-secondary focus:outline-none"
            aria-label="toggle menu"
            onClick={() => setMenu(!menu)}
          >
            {!menu ? (
              <svg
                viewBox="0 0 24 24"
                className="z-30 h-8 w-8 animate-[animation-fade-in2_0.3s_ease-in-out] fill-current"
              >
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            ) : (
              <svg
                className="z-30 h-8 w-8 animate-[animation-fade-in_0.3s_ease-in-out] fill-current"
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
        </section>
      </section>
    </nav>
  );
}

export default Navbar;
