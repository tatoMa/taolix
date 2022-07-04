import Image from "next/image";
import lostPic from "../public/lost.jpg";
import Link from "next/link";
import NextHeadSeo from "next-head-seo";

export default function Custom404({}) {
  return (
    <>
      <NextHeadSeo
        title={`404 Error page - Taolix`}
        description={`404 Error page on Taolix.`}
        canonical={`https://www.taolix.com/404`}
      />
      {/* Main section */}
      <div className="w-full h-[70vh] max-w-screen-2xl mx-auto flex justify-center mt-8 md:mt-0 mb-2">
        <div className="relative w-full h-full">
          <Image
            unoptimized={true}
            src={lostPic}
            alt="Picture of the author"
            layout="fill"
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute top-1/3">
          <div className="flex flex-col items-center ">
            <p className=" text-gray-400 text-md">404 ERROR</p>
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
    </>
  );
}
