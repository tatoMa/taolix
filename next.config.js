/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  redirects() {
    return [
      process.env.MAINTENANCE_MODE === "1"
        ? {
            source: "/((?!maintenance).*)",
            destination: "/maintenance.html",
            permanent: false,
          }
        : null,
    ].filter(Boolean);
  },
  pwa: {
    publicExcludes: [
      "!*.png",
      "!android/**/*",
      "!ios/**/*",
      "!windows11/**/*",
      "!splashscreens/**/*",
    ],
    disable: process.env.NODE_ENV !== "production",
  },
  images: {
    // loader: "custom",
    domains: [
      "image.tmdb.org",
      "www.themoviedb.org",
      "img.lywyx.com",
      "wmdb.querydata.org",
      "img.ylzy1.com",
      "pic.rmb.bdstatic.com",
      "img1.doubanio.com",
      "img2.doubanio.com",
      "img3.doubanio.com",
      "img4.doubanio.com",
      "img5.doubanio.com",
      "img6.doubanio.com",
      "img7.doubanio.com",
      "img8.doubanio.com",
      "img9.doubanio.com",
      "btbtt20.com",
      "p2.qhimg.com",
      "pic0.iqiyipic.com",
      "p1.ssl.qhimgs1.com",
      "xk.3v7.net",
    ],
  },
});
// const withPWA = require("next-pwa");
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });
// module.exports = withBundleAnalyzer(
// module.exports = withPWA()
// );
