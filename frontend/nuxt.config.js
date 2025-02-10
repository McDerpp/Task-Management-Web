export default {
  ssr: false,
  target: "static",

  head: {
    title: "todolist",
    htmlAttrs: { lang: "en" },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  css: ["@/assets/css/tailwind.css"],

  buildModules: ["@nuxtjs/tailwindcss"],

  modules: ["@pinia/nuxt"],

  build: {},

  compatibilityDate: "2025-02-06",

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
};

// export default {
//   // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
//   ssr: false,

//   // Target: https://go.nuxtjs.dev/config-target
//   target: "static",

//   // Global page headers: https://go.nuxtjs.dev/config-head
//   head: {
//     title: "todolist",
//     htmlAttrs: {
//       lang: "en",
//     },
//     meta: [
//       { charset: "utf-8" },
//       { name: "viewport", content: "width=device-width, initial-scale=1" },
//       { hid: "description", name: "description", content: "" },
//       { name: "format-detection", content: "telephone=no" },
//     ],
//     link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
//   },

//   // Global CSS: https://go.nuxtjs.dev/config-css
//   css: ["@/assets/css/tailwind.css"],

//   // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
//   plugins: [],

//   // Auto import components: https://go.nuxtjs.dev/config-components
//   components: true,

//   // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
//   buildModules: [
//     // https://go.nuxtjs.dev/tailwindcss
//     "@nuxtjs/tailwindcss",
//   ],

//   // Modules: https://go.nuxtjs.dev/config-modules
//   modules: ["@pinia/nuxt"],

//   // Build Configuration: https://go.nuxtjs.dev/config-build
//   build: {},

//   compatibilityDate: "2025-02-06",
// };
