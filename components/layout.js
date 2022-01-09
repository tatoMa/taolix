import HeadTag from "../components/HeadTag";
import { default as Navbar } from "../components/Header";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <>
      {/* HTML Head Element */}
      <HeadTag />

      {/* Navigation component */}
      <Navbar />

      <main className="mx-2 sm:mx-6 md:mx-10 lg:mx-14">{children}</main>

      {/* Footer component */}
      <Footer />
    </>
  );
}
