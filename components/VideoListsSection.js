import VideoItem from "../components/VideoItem";

const VideoListsSection = ({ videos }) => {
  // console.log(videos)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 sm:px-6 md:px-10 lg:px-14">
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
