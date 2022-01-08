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

      <main>{children}</main>

      {/* Footer component */}
      <Footer />
    </>
  );
}
