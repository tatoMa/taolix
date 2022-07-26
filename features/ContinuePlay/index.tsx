import LineBreak from "components/LineBreak";
import useLocalStorage from "hooks/useLocalStorage";
import React, { useEffect } from "react";
import ContinuePlaySwiper from "../../components/VideoItem/VideoItemWideSwiper";
const ContinuePlay = () => {
  const [playedMovies, setPlayedMovies] = useLocalStorage("playedMovies", []);
  return (
    <>
      {playedMovies?.length > 2 && (
        <>
          <LineBreak title="CONTINUE WATCHING..." />
          <ContinuePlaySwiper playedMovies={playedMovies} />
        </>
      )}
    </>
  );
};

export default ContinuePlay;
