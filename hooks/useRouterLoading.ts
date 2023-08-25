import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const useRouterLoading = (setLoading) => {
  const router = useRouter();
  let timer = useRef(null);

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Loading: ${url}`);
      timer.current = setTimeout(() => {
        setLoading(true);
      }, 150);
    };

    const handleStop = (url: string) => {
      console.log(`Done: ${url}`);
      clearTimeout(timer.current);
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);
};

export default useRouterLoading;
