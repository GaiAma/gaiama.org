exports.redirects = [
  // Redirect default Netlify subdomain to primary domain
  `https://gaiama.netlify.com/en/* https://www.gaiama.org/en/:splat 301!`,
  `https://gaiama.netlify.com/de/* https://www.gaiama.org/de/:splat 301!`,
  `https://gaiama.netlify.com/* https://www.gaiama.org/en/:splat 301!`,
  // Proxy /api to api.gaiama.org
  `/api/pixel/* https://pixel.api.gaiama.org/:splat 200`,
  `/api/* https://api.gaiama.org/:splat 200`,
  // subdomain redirects
  `https://spende.gaiama.org/* https://www.gaiama.org/en/donate/?ref=spende.gaiama.org#main-nav 301! Language=en`,
  `https://spende.gaiama.org/* https://www.gaiama.org/de/spenden/?ref=spende.gaiama.org#main-nav 301!`,
  `https://donate.gaiama.org/* https://www.gaiama.org/de/spenden/?ref=donate.gaiama.org#main-nav 301! Language=de`,
  `https://donate.gaiama.org/* https://www.gaiama.org/en/donate/?ref=donate.gaiama.org#main-nav 301!`,
  // donation shortcuts
  `/spenden /de/spenden/?ref=gaiama.org/spenden#main-nav 301`,
  `/spende /de/spenden/?ref=gaiama.org/spende#main-nav 301`,
  `/donate /en/donate/?ref=gaiama.org/donate#main-nav 301`,
]
