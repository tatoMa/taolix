import { RefreshIcon } from "@heroicons/react/outline";
import { NextRouter, useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";

interface ILoading {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
const Loading = ({ isLoading, setIsLoading }: ILoading) => {
  const router: NextRouter = useRouter();

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
      <RefreshIcon
        className="w-[25vw] animate-spin text-white lg:w-[15vw]"
        style={{ animationDirection: "reverse" }}
      />
    </div>
  );
};

export default Loading;
