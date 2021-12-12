// import logo from "../assets/logo.png";

import Link from "next/link";

function Header() {
  return (
    <div
      className="header top-0 fixed z-50 w-full h-16 transition duration-700"
      className={"bg-background"}
    >
      <div className="header__overlay absolute inset-0 w-full h-full"
      ></div>
      <div
        className="
        relative
        z-10
        flex
        items-center
        justify-between
        w-full
        h-full
        p-5
        px-4
        md:px-12
      "
      >
        <div className="flex items-center">
          {/* <mobile-nav className="lg:hidden" /> */}

          <img
            src="/logo.png"
            alt="logo"
            className="h-full w-28 object-cover ml-4"
          />

          <div className="items-center space-x-5 hidden lg:flex lg:ml-12">
            <Link href="#">
              <a
                className="
              hover:text-gray-300
              text-sm
              font-netflix_medium
              transition
              duration-300
              text-typography
            "
              >
                MOVIE
              </a>
            </Link>
            <Link href="#">
              <a
                className="
              hover:text-gray-300
              text-sm
              font-netflix_medium
              transition
              duration-300
              text-white
            "
              >
                TV SHOW
              </a>
            </Link>
            <Link href="#">
              <a
                className="
              hover:text-gray-300
              text-sm
              font-netflix_medium
              transition
              duration-300
              text-white
            "
              >
                REALITY SHOW
              </a>
            </Link>
            <Link href="#">
              <a
                className="
              hover:text-gray-300
              text-sm
              font-netflix_medium
              transition
              duration-300
              text-white
            "
              >
                ANIME
              </a>
            </Link>
          </div>
        </div>

        <search />
      </div>
      <style jsx>{`
        .header__overlay {
          background-image: -webkit-gradient(
            linear,
            left top,
            left bottom,
            color-stop(10%, rgba(0, 0, 0, 0.7)),
            color-stop(10%, rgba(0, 0, 0, 0))
          );
          background-image: -webkit-linear-gradient(
            top,
            rgba(0, 0, 0, 0.7) 10%,
            rgba(0, 0, 0, 0)
          );
          background-image: -o-linear-gradient(
            top,
            rgba(0, 0, 0, 0.7) 10%,
            rgba(0, 0, 0, 0)
          );
          background-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.7) 10%,
            rgba(0, 0, 0, 0)
          );
        }
      `}</style>
    </div>
  );
}

export default Header;

// import useHeaderRoute from "../hooks/useHeaderRoute";
// import Search from "./Search.vue";

// import MobileNav from "./MobileNav.vue";

// export default {
//   setup() {
//     const { currentRoute, routes } = useHeaderRoute();

//     const isTop = ref(true);

//     return {
//       currentRoute,
//       routes,
//       isTop,
//     };
//   },

//   components: {
//     Search,
//     MobileNav,
//   },

//   data() {
//     return { logo };
//   },

//   mounted() {
//     window.addEventListener("scroll", this.handleScroll);
//   },
//   destroyed() {
//     window.removeEventListener("scroll", this.handleScroll);
//   },
//   methods: {
//     handleScroll() {
//       this.isTop = window.scrollY === 0;
//     },
//   },
// };

// <style>
// /* From Netflix */
// .header__overlay {
//   background-image: -webkit-gradient(
//     linear,
//     left top,
//     left bottom,
//     color-stop(10%, rgba(0, 0, 0, 0.7)),
//     color-stop(10%, rgba(0, 0, 0, 0))
//   );
//   background-image: -webkit-linear-gradient(
//     top,
//     rgba(0, 0, 0, 0.7) 10%,
//     rgba(0, 0, 0, 0)
//   );
//   background-image: -o-linear-gradient(
//     top,
//     rgba(0, 0, 0, 0.7) 10%,
//     rgba(0, 0, 0, 0)
//   );
//   background-image: linear-gradient(
//     to bottom,
//     rgba(0, 0, 0, 0.7) 10%,
//     rgba(0, 0, 0, 0)
//   );
// }
// </style>
