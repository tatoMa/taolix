module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("daisyui"),
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-animate"),
    require("postcss-100vh-fix"),
  ],
  // daisyUI config (optional)
  daisyui: {
    // styled: true,
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          secondary: "#ff0000",
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          "background-color": "#181818",
          secondary: "#ff0000",
        },
      },
    ],
    darkTheme: "dark",
  },
};
