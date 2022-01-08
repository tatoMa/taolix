const about = () => {
  return (
    <>
      <div className="container mx-auto mt-24 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[25vh] lg:h-full ">
            <img
              className="h-full w-full object-cover"
              src="https://images.pexels.com/photos/270373/pexels-photo-270373.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
            />
          </div>
          <div className="flex bg-black text-gray-100 justify-center p-10">
            <div className="mb-auto mt-auto max-w-lg">
              <h1 className="text-3xl uppercase text-center">TAOLIX</h1>
              <div>
                <p className="font-semibold mb-5 text-center">
                  A blazing fast online video streaming service.
                </p>
                <p className="mb-4 text-gray-400">
                  TAOLIX is a open source project that focus on the user
                  experiences with blazing fast browsing speed and free for all
                  contents.
                </p>
                <p className="mb-4 text-gray-400">
                  All videos on TAOLIX are NOT hosted on TAOLIX server. We only
                  collect links and information from the Internet. Every videos
                  on TAOLIX are linkes to 3rd party. We do not provides any
                  video from our end.
                </p>
                <p className="mb-4 text-gray-400">
                  If you find any video are related to your privacy please
                  contact us. I will remove it as fast as possible.
                </p>
              </div>

              <a
                className="mt-4 block border text-center py-4 hover:bg-white hover:text-black"
                href="mailto:taolixtv@gmail.com"
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
