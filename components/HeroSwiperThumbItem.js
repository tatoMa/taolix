const HeroSwiperThumbItem = ({ movie }) => {
  return (
    <section className="relative">
      <div className="thumb-picture">
        <img
          src={movie.vod_pic}
          alt={movie.vod_name}
          className="aspect-[3/4] w-full scale-125 duration-300 animate-in fade-in hover:scale-150 hover:brightness-110 "
          referrerPolicy="no-referrer"
        />
      </div>
      <header className="thumb-text absolute top-[86%] z-10 whitespace-nowrap  bg-red-500 px-1 text-[0.9rem] text-white duration-300">
        {movie.vod_name}
      </header>
    </section>
  );
};

export default HeroSwiperThumbItem;
