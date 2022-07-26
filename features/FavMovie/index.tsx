import LineBreak from "components/LineBreak";
import useLocalStorage from "hooks/useLocalStorage";
import React, { useEffect } from "react";
import ContinuePlaySwiper from "../../components/VideoItem/VideoItemWideSwiper";
const ContinuePlay = () => {
  const [favMovies, setFavMovies] = useLocalStorage("favMovies", []);
  return (
    <>
      {favMovies?.length > 0 && (
        <>
          <LineBreak title="Favorite List..." />
          <ContinuePlaySwiper playedMovies={favMovies} />
        </>
      )}
    </>
  );
};

export default ContinuePlay;
