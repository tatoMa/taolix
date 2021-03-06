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
      name: "TV",
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
    <section
      id="bottom-navigation"
      className="fixed inset-x-0 bottom-0 z-10 block bg-base-300 shadow lg:hidden"
    >
      <div id="tabs" className="flex justify-between">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link href={link.linkUrl} key={link.name}>
              <a
                className={`btn btn-square inline-block grow rounded-none ${
                  router.asPath == link.linkUrl && " btn-secondary border-t-2"
                }`}
              >
                <Icon className="mb-1 inline-block h-6 w-6" />
                <span className="tab-home tab mb-1 block h-5 text-xs font-light text-gray-200 hover:text-secondary-content">
                  {link.name}
                </span>
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default MobileBottomMenu;
