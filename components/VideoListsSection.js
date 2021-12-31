import VideoItem from "../components/VideoItem";

const VideoListsSection = ({ videos }) => {
  // console.log(videos)
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 sm:gap-4 px-2 sm:px-6 md:px-10 lg:px-14">
      {videos.list.map((movie) => (
        <VideoItem
          name={movie.vod_name}
          type={movie.vod_class}
          pic={movie.vod_pic}
          // url={movie.vod_play_url
          //   .split("$$$")[1]
          //   .substring(movie.vod_play_url.split("$$$")[1].indexOf("h"))}
          id={movie.vod_id}
          key={movie.vod_id}
        />
      ))}
    </div>
  );
};

export default VideoListsSection;
