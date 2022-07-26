import LineBreak from "components/LineBreak";
import ContinuePlay from "features/ContinuePlay";

const mylist = () => {
  return (
    <div className="mt-20">
      <ContinuePlay />

      <LineBreak title="FAVORITE MOVIES..." />
      <p className="mt-4 text-lg font-light">Coming Soon...</p>
    </div>
  );
};

export default mylist;
