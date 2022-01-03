import {
  UserGroupIcon,
  VideoCameraIcon,
  HomeIcon,
  FilmIcon,
  PhotographIcon,
} from "@heroicons/react/outline";

import Link from "next/link";
import { useRouter } from "next/router";

const MobileBottomMenu = () => {
  const router = useRouter();

  console.log(router.asPath);
  const links = [
    {
      name: "HOME",
      linkUrl: "/",
      icon: HomeIcon,
    },
    {
      name: "MOVIE",
      linkUrl: "/list?t=6",
      icon: FilmIcon,
    },
    {
      name: "TV SHOW",
      linkUrl: "/list?t=13",
      icon: VideoCameraIcon,
    },
    {
      name: "REALITY",
      linkUrl: "/list?t=26",
      icon: UserGroupIcon,
    },
    {
      name: "ANIME",
      linkUrl: "/list?t=31",
      icon: PhotographIcon,
    },
  ];
  return (
    <div
      id="bottom-navigation"
      className="block lg:hidden fixed inset-x-0 bottom-0 z-10 bg-black shadow"
    >
      <div id="tabs" className="flex justify-between">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link href={link.linkUrl} key={link.name}>
              <a
                className={`transition ease-in-out delay-150 w-full focus:text-red-500 hover:text-gray-500 justify-center inline-block text-center pt-2 pb-1 ${
                  router.asPath == link.linkUrl &&
                  " border-t-2 border-red-500 text-red-500"
                }`}
              >
                <Icon className="h-6 w-6 inline-block mb-1" />
                <span className="tab tab-home block text-xs">{link.name}</span>
              </a>
            </Link>
          );
        })}
        {/* <Link href="/list?t=6">
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
        </Link> */}
      </div>
    </div>
  );
};

export default MobileBottomMenu;
