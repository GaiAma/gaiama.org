exports.redirects = [
  // Redirect default Netlify subdomain to primary domain
  `https://gaiama.netlify.com/en/* https://www.gaiama.org/en/:splat 301!`,
  `https://gaiama.netlify.com/de/* https://www.gaiama.org/de/:splat 301!`,
  `https://gaiama.netlify.com/* https://www.gaiama.org/en/:splat 301!`,
  // Proxy /api to api.gaiama.org
  `/api/pixel/* https://pixel.api.gaiama.org/:splat 200`,
  `/api/* https://api.gaiama.org/:splat 200`,
  // subdomain redirects
  `https://spende.gaiama.org/* https://www.gaiama.org/en/donate/#main-nav 301! Language=en`,
  `https://spende.gaiama.org/* https://www.gaiama.org/de/spenden/#main-nav 301!`,
  `https://donate.gaiama.org/* https://www.gaiama.org/de/spenden/#main-nav 301! Language=de`,
  `https://donate.gaiama.org/* https://www.gaiama.org/en/donate/#main-nav 301!`,
  // donation shortcuts
  `/spenden /de/spenden/#main-nav 301`,
  `/spende /de/spenden/#main-nav 301`,
  `/donate /en/donate/#main-nav 301`,
]
