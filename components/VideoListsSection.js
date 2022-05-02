import VideoItem from "../components/VideoItem";

const VideoListsSection = ({ videos }) => {
  // console.log(videos);
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
      {videos.list.map((movie) => (
        <VideoItem
          name={movie.vod_name}
          type={movie.vod_class}
          pic={movie.vod_pic}
          id={movie.vod_id}
          remarks={movie.vod_remarks}
          key={movie.vod_id}
          rate={
            movie.rate
              ? movie.rate
              : movie.vod_douban_score != 0
              ? movie.vod_douban_score
              : ""
          }
        />
      ))}
    </div>
  );
};

export default VideoListsSection;
