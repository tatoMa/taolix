import Image from "next/image";
import { useRouter } from "next/router";

const VideoItem = ({ name, type, pic, id }) => {
  const router = useRouter();

  return (
    <>
      <div className="overflow-hidden bg-black cursor-pointer">
        <div className="relative" onClick={() => router.push(`/detail/${id}`)}>
          <div className="h-40 relative">
            <Image
              unoptimized={true}
              src={
                pic ||
                "https://img3.doubanio.com/f/movie/5081e011b4b06f1a8c3735122b38e781bd852ab6/pics/movie/movie_default_medium.png"
              }
              alt={name}
              className="object-cover"
              layout="fill"
            />
          </div>

          <div className="absolute bottom-0 left-0 bg-black/75">
            <div className="block text-xl font-bold text-white">{name}</div>
            <div className="text-xs text-white">{type}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoItem;
