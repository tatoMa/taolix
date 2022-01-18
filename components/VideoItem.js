import Image from "next/image";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const VideoItem = ({ name, type, pic, id, remarks, rate }) => {
  const router = useRouter();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {inView ? (
        <div
          className="overflow-hidden relative bg-black cursor-pointer hover:brightness-75"
          onClick={() => router.push(`/detail/${id}`)}
        >
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
              loader={myLoader}
            />
          </div>

          <div className="absolute bottom-0 left-0 bg-black/75 text-white line-clamp-3 text-xl font-bold">
            {name}
            <span className="block text-xs text-gray-400 line-clamp-1">
              {type}
            </span>
          </div>
          <div className="absolute top-0 right-0 bg-black/75 text-sm text-gray-300 pt-1">
            {remarks}
          </div>
          {rate && (
            <div className="absolute top-0 left-0 bg-black/75 text-sm text-orange-400 pt-1 pl-1">
              豆瓣{rate}
            </div>
          )}
        </div>
      ) : (
        <div className="animate-pulse">
          <div className="rounded bg-slate-200 w-full aspect-[3/4] p-2"></div>
        </div>
      )}
    </div>
  );
};

export default VideoItem;
