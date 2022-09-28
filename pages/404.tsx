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
      <div className="mx-auto mt-8 mb-2 flex h-[70vh] w-full max-w-screen-2xl justify-center md:mt-0">
        <div className="relative h-full w-full">
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
            <p className=" text-md text-gray-400">404 ERROR</p>
            <p className=" text-2xl text-white md:text-4xl">
              Uh oh! I think you&apos;re lost.
            </p>
            <p className=" md:text-md mt-1 text-sm text-gray-400">
              It looks like the page you are looking for doesn&apos;t exist.
            </p>
            <Link href="/">
              <a className="mt-4 border bg-white/30 py-1 px-6 text-xl font-bold text-white hover:bg-white/10 hover:text-gray-300">
                Go back home
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
