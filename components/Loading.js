import { RefreshIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Loading = ({ isLoading, setIsLoading }) => {
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
  }, [router.asPath]);
  return (
    <div
      className={`fixed w-screen h-screen bg-gray-500/75 pointer-events-none flex justify-center items-center z-50 ${
        !isLoading && "hidden"
      }`}
    >
      <RefreshIcon className="text-white animate-spin w-[25vw] lg:w-[15vw]" />
    </div>
  );
};

export default Loading;
