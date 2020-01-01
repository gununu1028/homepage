module.exports = {
  base: "/official-blog/",
  dest: process.cwd() + "/docs/",
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css"
      }
    ]
  ]
};
