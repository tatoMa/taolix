import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import useOnScrolled from "../hooks/useOnScrolled";

function Header() {
  const { data: session } = useSession();
  const scrolled = useOnScrolled();
  // console.log(session.user.image);
  return (
    <div className={`top-0 fixed w-full h-16 z-10 bg-gradient-to-b from-gray-900 to-transparent transition duration-1000 ${scrolled?'bg-black':''}`}>
      <div className="flex justify-between items-center h-16 px-10">
        <div>
          <img src="/logo.png" alt="logo" className="h-4 object-contain" />
        </div>
        <div>
          <Link href="#">
            <a
              className="
              hover:text-white
              text-sm
              font-netflix_medium
              transition
              duration-300
              text-white
              px-3
            "
            >
              HOME
            </a>
          </Link>
          <Link href="#">
            <a
              className="
              hover:text-white
              text-sm
              font-netflix_medium
              transition
              duration-300
              text-gray-400
              px-3
            "
            >
              MOVIE
            </a>
          </Link>
          <Link href="#">
            <a
              className="
              hover:text-white
              text-sm
              font-netflix_medium
              transition
              duration-300
              text-gray-400
              px-3
            "
            >
              TV SHOW
            </a>
          </Link>
          <Link href="#">
            <a
              className="
              hover:text-white
              text-sm
              font-netflix_medium
              transition
              duration-300
              text-gray-400
              px-3
            "
            >
              REALITY SHOW
            </a>
          </Link>
          <Link href="#">
            <a
              className="
              hover:text-white
              text-sm
              font-netflix_medium
              transition
              duration-300
              text-gray-400
              px-3
            "
            >
              ANIME
            </a>
          </Link>
        </div>
        <div>
          {session ? (
            <div className="flex gap-2 items-center">
              
              <button
                onClick={() => signOut()}
                className="text-white bg-red-600 px-6 py-1 rounded-md hover:bg-opacity-80"
              >
                Sign out
              </button>
              <img
                className="inline-block h-10 w-10 rounded-full"
                src={session.user.image}
                alt=""
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="text-white bg-red-600 px-6 py-1 rounded-md hover:bg-opacity-80"
            >
              Sign in
            </button>
          )}
        </div>
      </div>

      <style jsx>{``}</style>
    </div>
  );
}

export default Header;
