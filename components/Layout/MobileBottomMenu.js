import {
  UserGroupIcon,
  VideoCameraIcon,
  HomeIcon,
  FilmIcon,
  PhotographIcon,
} from "@heroicons/react/outline";

import Link from "next/link";
import { useRouter } from "next/router";
import { MAJORS } from "../../utils/const";

const MobileBottomMenu = () => {
  const router = useRouter();

  // console.log(router.asPath);
  const links = [
    {
      name: "HOME",
      linkUrl: "/",
      icon: HomeIcon,
    },
    {
      name: "MOVIE",
      linkUrl: `/list/${MAJORS[0].type}/1`,
      icon: FilmIcon,
    },
    {
      name: "TV SHOW",
      linkUrl: `/list/${MAJORS[1].type}/1`,
      icon: VideoCameraIcon,
    },
    {
      name: "REALITY",
      linkUrl: `/list/${MAJORS[2].type}/1`,
      icon: UserGroupIcon,
    },
    {
      name: "ANIME",
      linkUrl: `/list/${MAJORS[3].type}/1`,
      icon: PhotographIcon,
    },
  ];
  return (
    <div
      id="bottom-navigation"
      className="fixed inset-x-0 bottom-0 z-10 block bg-black text-gray-300 shadow lg:hidden"
    >
      <div id="tabs" className="flex justify-between">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link href={link.linkUrl} key={link.name}>
              <a
                className={`inline-block w-full justify-center pt-2 pb-1 text-center transition delay-150 ease-in-out hover:text-gray-500 focus:text-red-500 ${
                  router.asPath == link.linkUrl &&
                  " border-t-2 border-red-500 text-red-500"
                }`}
              >
                <Icon className="mb-1 inline-block h-6 w-6" />
                <span className="tab tab-home block text-xs">{link.name}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomMenu;
