import {
  UserGroupIcon,
  VideoCameraIcon,
  HomeIcon,
  FilmIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
const MobileBottomMenu = () => {
  return (
    <div
      id="bottom-navigation"
      className="block lg:hidden fixed inset-x-0 bottom-0 z-10 bg-black shadow"
    >
      <div id="tabs" className="flex justify-between">
        <Link href="/">
          <a className="w-full focus:text-gray-500 hover:text-gray-500 justify-center inline-block text-center pt-2 pb-1">
            <HomeIcon className="h-6 w-6 focus:text-gray-500 hover:text-gray-500 text-white inline-block mb-1" />
            <span className="tab tab-home block text-xs">Home</span>
          </a>
        </Link>
        <Link href="/list?t=6">
          <a className="w-full focus:text-gray-500 hover:text-gray-500 justify-center inline-block text-center pt-2 pb-1">
            <FilmIcon className="h-6 w-6 focus:text-gray-500 hover:text-gray-500 text-white inline-block mb-1" />
            <span className="tab tab-kategori block text-xs">Movie</span>
          </a>
        </Link>
        <Link href="/list?t=13">
          <a className="w-full focus:text-gray-500 hover:text-gray-500 justify-center inline-block text-center pt-2 pb-1">
            <VideoCameraIcon className="h-6 w-6 focus:text-gray-500 hover:text-gray-500 text-white inline-block mb-1" />
            <span className="tab tab-explore block text-xs">TV Show</span>
          </a>
        </Link>
        <Link href="/list?t=26">
          <a className="w-full focus:text-gray-500 hover:text-gray-500 justify-center inline-block text-center pt-2 pb-1">
            <UserGroupIcon className="h-6 w-6 focus:text-gray-500 hover:text-gray-500 text-white inline-block mb-1" />
            <span className="tab tab-whishlist block text-xs">Reality</span>
          </a>
        </Link>
        <Link href="/list?t=31">
          <a className="w-full focus:text-gray-500 hover:text-gray-500 justify-center inline-block text-center pt-2 pb-1">
            <PhotographIcon className="h-6 w-6 focus:text-gray-500 hover:text-gray-500 text-white inline-block mb-1" />
            <span className="tab tab-account block text-xs">Anime</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MobileBottomMenu;
