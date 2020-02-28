module.exports = {
  base: "/",
  dest: process.cwd() + "/dest/",
  title: "まつだあつしのホームページ",
  locales: {
    "/": {
      lang: "ja"
    }
  },
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css"
      }
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Noto+Sans+JP&display=swap"
      }
    ]
  ],
  plugins: [
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-159032966-1"
      }
    ]
  ]
};
