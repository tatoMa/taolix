import HeadTag from "../components/HeadTag";
import Footer from "../components/Footer";
import { default as Navbar } from "../components/Header";
import Image from "next/image";
import lostPic from "../public/lost.jpg";
import Link from "next/link";

export default function Custom500({}) {
  return (
    <>
      {/* HTML Head Element */}
      <HeadTag />

      {/* Navigation component */}
      <Navbar />

      {/* Main section */}
      <div className="w-full h-[70vh] max-w-screen-2xl mx-auto flex justify-center mt-8 md:mt-0 mb-2">
        <div className="relative w-full h-full">
          <Image
            src={lostPic}
            alt="Picture of the author"
            layout="fill"
            className="object-cover"
          />
        </div>
        <div className="absolute top-1/3">
          <div className="flex flex-col items-center ">
            <p className=" text-gray-400 text-md">500 ERROR</p>
            <p className=" text-2xl md:text-4xl text-white">
              Uh oh! I think you're lost.
            </p>
            <p className=" text-gray-400 text-sm md:text-md mt-1">
              It looks like the page you are looking for doesn't exist.
            </p>
            <Link href="/">
              <a className="text-xl font-bold text-white border py-1 px-6 mt-4 bg-white/30 hover:bg-white/10 hover:text-gray-300">
                Go back home
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer component */}
      <Footer className="max-w-screen-2xl" />
    </>
  );
}
