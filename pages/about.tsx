import NextHeadSeo from "next-head-seo";
import { useFocus } from "../hooks/useFocus";
import { useRef } from "react";

const about = () => {
  const titleRef = useRef(null);

  useFocus(titleRef);

  return (
    <>
      <NextHeadSeo
        title={`About us - Taolix`}
        description={`About us page on Taolix.`}
        canonical={`https://www.taolix.com/about`}
      />
      <div className="container mx-auto mt-24 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[25vh] lg:h-full ">
            <img
              className="h-full w-full object-cover"
              src="https://images.pexels.com/photos/270373/pexels-photo-270373.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
            />
          </div>
          <div className="flex justify-center bg-black p-10 text-gray-100">
            <div className="mb-auto mt-auto max-w-lg">
              <h1
                className="text-center text-3xl uppercase"
                data-testid={"title"}
                ref={titleRef}
                tabIndex={0}
              >
                TAOLIX
              </h1>
              <div>
                <p
                  className="mb-5 text-center font-semibold"
                  data-testid={"sub-title"}
                >
                  A blazing fast online video streaming service.
                </p>
                <p className="mb-4 text-gray-400" data-testid={"taolix-intro"}>
                  TAOLIX is a open source project that focus on the user
                  experiences with blazing fast browsing speed and free for all
                  contents.
                </p>
                <p
                  className="mb-4 text-gray-400"
                  data-testid={"taolix-disclaimer-video-source"}
                >
                  All videos on TAOLIX are NOT hosted on TAOLIX server. We only
                  collect links and information from the Internet. Every videos
                  on TAOLIX are links to 3rd party. We do not provides any video
                  from our end.
                </p>
                <p
                  className="mb-4 text-gray-400"
                  data-testid={"taolix-disclaimer-delete"}
                >
                  If you find any video are violated to your privacy please
                  contact us. I will remove it as fast as possible.
                </p>
              </div>

              <a
                className="mt-4 block border py-4 text-center hover:bg-white hover:text-black"
                href="mailto:taolixtv@gmail.com"
                data-testid={"taolix-contact"}
              >
                taolixtv@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default about;
