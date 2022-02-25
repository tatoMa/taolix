import dynamic from "next/dynamic";
import HeadSeo from "./HeadSeo";
import { default as Navbar } from "./Header";
import Footer from "./Footer";
const MobileBottomMenu = dynamic(() => import("./MobileBottomMenu"));

export default function Layout({ children }) {
  return (
    <>
      {/* HTML Head Element */}
      <HeadSeo />

      {/* Navigation component */}
      <Navbar />

      <main className="mx-2 sm:mx-6 md:mx-10 lg:mx-14">{children}</main>

      {/* Footer component */}
      <Footer />

      {/* Mobile Bottom Menu */}
      <MobileBottomMenu />
    </>
  );
}
