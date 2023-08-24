import { GetServerSideProps } from "next";
import { APILIST } from "utils/const";

const checkenv = ({ allApiLists }) => {
  return <div className="mt-32">{JSON.stringify(allApiLists)}</div>;
};

export default checkenv;

export const getStaticProps: GetServerSideProps = async (context) => {
  let allApiLists = APILIST;
  return {
    props: {
      allApiLists,
    },
  };
};
