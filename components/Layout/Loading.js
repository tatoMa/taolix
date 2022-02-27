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
      className={`pointer-events-none fixed z-50 flex h-screen w-screen items-center justify-center bg-gray-500/75 ${
        !isLoading && "hidden"
      }`}
    >
      <RefreshIcon className="w-[25vw] animate-spin text-white lg:w-[15vw]" />
    </div>
  );
};

export default Loading;
