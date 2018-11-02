exports.redirects = [
  // Redirect default Netlify subdomain to primary domain
  `https://gaiama.netlify.com/en/* https://www.gaiama.org/en/:splat 301!`,
  `https://gaiama.netlify.com/de/* https://www.gaiama.org/de/:splat 301!`,
  `https://gaiama.netlify.com/* https://www.gaiama.org/en/:splat 301!`,
  // Proxy /api to api.gaiama.org
  `/api/pixel/* https://pixel.api.gaiama.org/:splat 200`,
  `/api/* https://api.gaiama.org/:splat 200`,
  // subdomain redirects
  `https://spende.gaiama.org/* https://www.gaiama.org/en/donate/?utm_source=spende.gaiama.org#main-nav 301! Language=en`,
  `https://www.spende.gaiama.org/* https://www.gaiama.org/en/donate/?utm_source=spende.gaiama.org#main-nav 301! Language=en`,
  `https://spende.gaiama.org/* https://www.gaiama.org/de/spenden/?utm_source=spende.gaiama.org#main-nav 301!`,
  `https://www.spende.gaiama.org/* https://www.gaiama.org/de/spenden/?utm_source=spende.gaiama.org#main-nav 301!`,
  `https://donate.gaiama.org/* https://www.gaiama.org/de/spenden/?utm_source=donate.gaiama.org#main-nav 301! Language=de`,
  `https://www.donate.gaiama.org/* https://www.gaiama.org/de/spenden/?utm_source=donate.gaiama.org#main-nav 301! Language=de`,
  `https://donate.gaiama.org/* https://www.gaiama.org/en/donate/?utm_source=donate.gaiama.org#main-nav 301!`,
  `https://www.donate.gaiama.org/* https://www.gaiama.org/en/donate/?utm_source=donate.gaiama.org#main-nav 301!`,
  // donation shortcuts
  `/spenden /de/spenden/?utm_source=gaiama.org/spenden#main-nav 301`,
  `/spende /de/spenden/?utm_source=gaiama.org/spende#main-nav 301`,
  `/donate /en/donate/?utm_source=gaiama.org/donate#main-nav 301`,
]
