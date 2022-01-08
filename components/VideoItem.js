import Image from "next/image";
import { useRouter } from "next/router";

const VideoItem = ({ name, type, pic, id, remarks }) => {
  const router = useRouter();

  return (
    <>
      <div className="overflow-hidden bg-black cursor-pointer hover:brightness-75">
        <div className="relative" onClick={() => router.push(`/detail/${id}`)}>
          <div className="w-full aspect-[3/4]">
            <Image
              unoptimized={true}
              src={
                pic ||
                "https://img3.doubanio.com/f/movie/5081e011b4b06f1a8c3735122b38e781bd852ab6/pics/movie/movie_default_medium.png"
              }
              alt={name}
              className="object-cover"
              layout="fill"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="absolute bottom-0 left-0 bg-black/75 text-white">
            <div className="block text-xl font-bold text-white line-clamp-2">
              {name}
            </div>
            <div className="text-xs text-gray-400">{type}</div>
          </div>
          <div className="absolute top-0 right-0 bg-black/75 text-sm text-gray-300 pt-1">
            {remarks}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoItem;
