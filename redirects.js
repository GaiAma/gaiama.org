const ifGermanLanguage = `Language=de,de-de,de-at,de-ch,cd-li,de-lu`

module.exports = [
  // Redirect default Netlify subdomain to primary domain
  `https://gaiama.netlify.com/* https://www.gaiama.org/de/:splat 301! ${ifGermanLanguage}`,
  `https://gaiama.netlify.com/* https://www.gaiama.org/en/:splat 301!`,
  `https://gaiama.netlify.com/en/* https://www.gaiama.org/en/:splat 301!`,
  `https://gaiama.netlify.com/de/* https://www.gaiama.org/de/:splat 301!`,
  // Proxy /api to api.gaiama.org
  // `/api/pixel/* https://pixel.api.gaiama.org/:splat 200`,
  // `/api/* https://api.gaiama.org/:splat 200`,

  // subdomain redirects
  `https://spende.gaiama.org/* https://www.gaiama.org/de/spenden/ 301! ${ifGermanLanguage}`,
  `https://www.spende.gaiama.org/* https://www.gaiama.org/de/spenden/ 301! ${ifGermanLanguage}`,
  `https://spende.gaiama.org/* https://www.gaiama.org/en/donate/ 301!`,
  `https://www.spende.gaiama.org/* https://www.gaiama.org/en/donate/ 301!`,
  `https://donate.gaiama.org/* https://www.gaiama.org/de/spenden/ 301! ${ifGermanLanguage}`,
  `https://www.donate.gaiama.org/* https://www.gaiama.org/de/spenden/ 301! ${ifGermanLanguage}`,
  `https://donate.gaiama.org/* https://www.gaiama.org/en/donate/ 301!`,
  `https://www.donate.gaiama.org/* https://www.gaiama.org/en/donate/ 301!`,

  // TODO: move redirects to the respective MDX files, how about Language wildcards?
  `https://shop.gaiama.org/de https://www.gaiama.org/de/shop/ 301! ${ifGermanLanguage}`,
  `https://shop.gaiama.org/en https://www.gaiama.org/en/shop/ 301!`,
  `https://www.shop.gaiama.org/* https://www.gaiama.org/de/shop/ 301! ${ifGermanLanguage}`,
  `https://www.shop.gaiama.org/* https://www.gaiama.org/en/shop/ 301!`,
  `https://shop.gaiama.org/* https://www.gaiama.org/de/shop/ 301! ${ifGermanLanguage}`,
  `https://shop.gaiama.org/* https://www.gaiama.org/en/shop/ 301!`,

  `/shop /de/shop/ 301! ${ifGermanLanguage}`,
  `/shop /en/shop/ 301!`,

  // donation shortcuts
  `/spenden /de/spenden/ 301!`,
  `/spende /de/spenden/ 301!`,
  `/donate /en/donate/ 301!`,

  `/de/blog* /de 301! ${ifGermanLanguage}`,
  `/en/blog* /en 301!`,

  // `/Left-in-the_Dark_free-edition-c604d4d35b6aedd11d4470a8cee465fd.pdf /assets/Left-in-the_Dark_free-edition.pdf 301`,

  // happygaia articles soon to be moved to dedicated archive blog happygaia.com
  // `/de/blog/ein-grosser-bakterienhaufen/ https://www.happygaia.com/de/blog/ein-grosser-bakterienhaufen/ 301!`,
  // `/en/blog/a-big-pile-of-bacteria/ https://www.happygaia.com/en/blog/a-big-pile-of-bacteria/ 301!`,
  // `/de/blog/nix-drueber/ https://www.happygaia.com/de/blog/nix-drueber/ 301!`,
  // `/en/blog/a-true-story/ https://www.happygaia.com/en/blog/a-true-story/ 301!`,
  // `/de/blog/blogs-liest-man-uebrigens-rueckwaerts/ https://www.happygaia.com/de/blog/blogs-liest-man-uebrigens-rueckwaerts/ 301!`,
  // `/en/blog/addicted-to-blogging/ https://www.happygaia.com/en/blog/addicted-to-blogging/ 301!`,
  // `/de/blog/wenn-sternschnuppen-fliegen/ https://www.happygaia.com/de/blog/wenn-sternschnuppen-fliegen/ 301!`,
  // `/en/blog/airplanes-are-shootingstars/ https://www.happygaia.com/en/blog/airplanes-are-shootingstars/ 301!`,
  // `/de/blog/es-gibt-keine-katzen-in-amerika/ https://www.happygaia.com/de/blog/es-gibt-keine-katzen-in-amerika/ 301!`,
  // `/en/blog/america/ https://www.happygaia.com/en/blog/america/ 301!`,
  // `/de/blog/hui-statt-pfui/ https://www.happygaia.com/de/blog/hui-statt-pfui/ 301!`,
  // `/en/blog/applause-for-human-fur/ https://www.happygaia.com/en/blog/applause-for-human-fur/ 301!`,
  // `/de/blog/brokkoligratin/ https://www.happygaia.com/de/blog/brokkoligratin/ 301!`,
  // `/en/blog/broccoli-gratin/ https://www.happygaia.com/en/blog/broccoli-gratin/ 301!`,
  // `/de/blog/camembert-kaese-mit-kokosbrot/ https://www.happygaia.com/de/blog/camembert-kaese-mit-kokosbrot/ 301!`,
  // `/en/blog/camembert-cheese-with-coconut-bread/ https://www.happygaia.com/en/blog/camembert-cheese-with-coconut-bread/ 301!`,
  // `/de/blog/weihnachten-in-cusco-peru/ https://www.happygaia.com/de/blog/weihnachten-in-cusco-peru/ 301!`,
  // `/en/blog/christmas-in-cusco-peru/ https://www.happygaia.com/en/blog/christmas-in-cusco-peru/ 301!`,
  // `/de/blog/koks-lumbien/ https://www.happygaia.com/de/blog/koks-lumbien/ 301!`,
  // `/en/blog/coca-lombia/ https://www.happygaia.com/en/blog/coca-lombia/ 301!`,
  // `/de/blog/bunt-bunter-peru/ https://www.happygaia.com/de/blog/bunt-bunter-peru/ 301!`,
  // `/en/blog/colors-more-colors-peru/ https://www.happygaia.com/en/blog/colors-more-colors-peru/ 301!`,
  // `/de/blog/von-der-heide-in-den-sueden/ https://www.happygaia.com/de/blog/von-der-heide-in-den-sueden/ 301!`,
  // `/en/blog/following-the-sun/ https://www.happygaia.com/en/blog/following-the-sun/ 301!`,
  // `/de/blog/grenzen-wollen-ueberschritten-werden/ https://www.happygaia.com/de/blog/grenzen-wollen-ueberschritten-werden/ 301!`,
  // `/en/blog/french-kiss/ https://www.happygaia.com/en/blog/french-kiss/ 301!`,
  // `/de/blog/wie-man-gold-macht/ https://www.happygaia.com/de/blog/wie-man-gold-macht/ 301!`,
  // `/en/blog/how-to-make-gold/ https://www.happygaia.com/en/blog/how-to-make-gold/ 301!`,
  // `/de/blog/julias-tag-bei-uns-leben-nahe-des-machu-picchu/ https://www.happygaia.com/de/blog/julias-tag-bei-uns-leben-nahe-des-machu-picchu/ 301!`,
  // `/en/blog/julias-day-with-us-living-near-machu-picchu/ https://www.happygaia.com/en/blog/julias-day-with-us-living-near-machu-picchu/ 301!`,
  // `/de/blog/im-land-der-inka/ https://www.happygaia.com/de/blog/im-land-der-inka/ 301!`,
  // `/de/blog/alpacca-bussi-geben/ https://www.happygaia.com/de/blog/alpacca-bussi-geben/ 301!`,
  // `/en/blog/land-of-the-inka/ https://www.happygaia.com/en/blog/land-of-the-inka/ 301!`,
  // `/en/blog/kiss-kiss-the-alpacca/ https://www.happygaia.com/en/blog/kiss-kiss-the-alpacca/ 301!`,
  // `/de/blog/lakritze-zum-fruehstueck/ https://www.happygaia.com/de/blog/lakritze-zum-fruehstueck/ 301!`,
  // `/en/blog/licorice-for-breakfast/ https://www.happygaia.com/en/blog/licorice-for-breakfast/ 301!`,
  // `/de/blog/der-geschmack-einer-leichten-mayonnaise-ganz-fix-gemixt/ https://www.happygaia.com/de/blog/der-geschmack-einer-leichten-mayonnaise-ganz-fix-gemixt/ 301!`,
  // `/en/blog/mayonnaise-fast-mixed-easy-ingredients/ https://www.happygaia.com/en/blog/mayonnaise-fast-mixed-easy-ingredients/ 301!`,
  // `/de/blog/natuerliche-verhuetung/ https://www.happygaia.com/de/blog/natuerliche-verhuetung/ 301!`,
  // `/en/blog/natural-birth-control/ https://www.happygaia.com/en/blog/natural-birth-control/ 301!`,
  // `/de/blog/internet-aus-der-natur-das-fundament-der-permakultur/ https://www.happygaia.com/de/blog/internet-aus-der-natur-das-fundament-der-permakultur/ 301!`,
  // `/en/blog/natural-internet-the-foundation-of-permaculture/ https://www.happygaia.com/en/blog/natural-internet-the-foundation-of-permaculture/ 301!`,
  // `/de/blog/die-rhone-ist-kein-fluss-sondern-ein-catwalk/ https://www.happygaia.com/de/blog/die-rhone-ist-kein-fluss-sondern-ein-catwalk/ 301!`,
  // `/en/blog/not-a-river-but-a-catwalk/ https://www.happygaia.com/en/blog/not-a-river-but-a-catwalk/ 301!`,
  // `/de/blog/oh-hoer-nicht-auf/ https://www.happygaia.com/de/blog/oh-hoer-nicht-auf/ 301!`,
  // `/en/blog/oh-dont-stop/ https://www.happygaia.com/en/blog/oh-dont-stop/ 301!`,
  // `/de/blog/packliste/ https://www.happygaia.com/de/blog/packliste/ 301!`,
  // `/en/blog/packing-list/ https://www.happygaia.com/en/blog/packing-list/ 301!`,
  // `/de/blog/permakultur-im-grossen-stil/ https://www.happygaia.com/de/blog/permakultur-im-grossen-stil/ 301!`,
  // `/en/blog/permaculture-in-big-areas/ https://www.happygaia.com/en/blog/permaculture-in-big-areas/ 301!`,
  // `/de/blog/das-echte-leben-hat-gewonnen/ https://www.happygaia.com/de/blog/das-echte-leben-hat-gewonnen/ 301!`,
  // `/en/blog/real-life-won/ https://www.happygaia.com/en/blog/real-life-won/ 301!`,
  // `/de/blog/sex-mit-pflanzen/ https://www.happygaia.com/de/blog/sex-mit-pflanzen/ 301!`,
  // `/en/blog/sex-with-plants/ https://www.happygaia.com/en/blog/sex-with-plants/ 301!`,
  // `/de/blog/start-ins-leben/ https://www.happygaia.com/de/blog/start-ins-leben/ 301!`,
  // `/en/blog/starting-our-new-life/ https://www.happygaia.com/en/blog/starting-our-new-life/ 301!`,
  // `/de/blog/gefuellte-paprika/ https://www.happygaia.com/de/blog/gefuellte-paprika/ 301!`,
  // `/en/blog/stuffed-sweet-pepper/ https://www.happygaia.com/en/blog/stuffed-sweet-pepper/ 301!`,
  // `/de/blog/wie-teig-naschen-creme/ https://www.happygaia.com/de/blog/wie-teig-naschen-creme/ 301!`,
  // `/en/blog/tastes-like-dough/ https://www.happygaia.com/en/blog/tastes-like-dough/ 301!`,
  // `/de/blog/der-2-tag-auf-weltreise/ https://www.happygaia.com/de/blog/der-2-tag-auf-weltreise/ 301!`,
  // `/en/blog/the-2nd-day-on-our-round-the-world-trip/ https://www.happygaia.com/en/blog/the-2nd-day-on-our-round-the-world-trip/ 301!`,
  // `/de/blog/die-grundlagen-der-permakultur/ https://www.happygaia.com/de/blog/die-grundlagen-der-permakultur/ 301!`,
  // `/en/blog/the-basics-of-permaculture/ https://www.happygaia.com/en/blog/the-basics-of-permaculture/ 301!`,
  // `/de/blog/besuch-der-ersten-oekogemeinschaft/ https://www.happygaia.com/de/blog/besuch-der-ersten-oekogemeinschaft/ 301!`,
  // `/en/blog/the-first-eco-village/ https://www.happygaia.com/en/blog/the-first-eco-village/ 301!`,
  // `/de/blog/die-haben-nix-drauf https://www.happygaia.com/de/blog/die-haben-nix-drauf 301!`,
  // `/de/blog/die-hat-nix-drauf https://www.happygaia.com/de/blog/die-hat-nix-drauf 301!`,
  // `/en/blog/the-natural-way-to-clean-yourself/ https://www.happygaia.com/en/blog/the-natural-way-to-clean-yourself/ 301!`,
  // `/de/blog/ein-land-das-es-nicht-gibt/ https://www.happygaia.com/de/blog/ein-land-das-es-nicht-gibt/ 301!`,
  // `/en/blog/the-non-existing-country/ https://www.happygaia.com/en/blog/the-non-existing-country/ 301!`,
  // `/de/blog/der-rohkostartikel-1-2/ https://www.happygaia.com/de/blog/der-rohkostartikel-1-2/ 301!`,
  // `/en/blog/the-raw-food-article-1-2/ https://www.happygaia.com/en/blog/the-raw-food-article-1-2/ 301!`,
  // `/de/blog/zwei-schoepfer-und-ein-nilpferd-im-wunderland/ https://www.happygaia.com/de/blog/zwei-schoepfer-und-ein-nilpferd-im-wunderland/ 301!`,
  // `/en/blog/two-creators-and-a-hippo-in-wonderland/ https://www.happygaia.com/en/blog/two-creators-and-a-hippo-in-wonderland/ 301!`,
  // `/de/blog/nix-drunter/ https://www.happygaia.com/de/blog/nix-drunter/ 301!`,
  // `/en/blog/under-a-wear/ https://www.happygaia.com/en/blog/under-a-wear/ 301!`,
  // `/de/blog/staedte-begruenen/ https://www.happygaia.com/de/blog/staedte-begruenen/ 301!`,
  // `/en/blog/urban-permaculture/ https://www.happygaia.com/en/blog/urban-permaculture/ 301!`,
  // `/de/blog/leserfragen-zum-haarewaschen-nur-mit-wasser-meine-besten-tricks-so-klappt-es/ https://www.happygaia.com/de/blog/leserfragen-zum-haarewaschen-nur-mit-wasser-meine-besten-tricks-so-klappt-es/ 301!`,
  // `/en/blog/user-question-more-details-about-hair-washing-only-with-water-please/ https://www.happygaia.com/en/blog/user-question-more-details-about-hair-washing-only-with-water-please/ 301!`,
  // `/de/blog/viva-la-boobies/ https://www.happygaia.com/de/blog/viva-la-boobies/ 301!`,
  // `/en/blog/viva-la-boobies/ https://www.happygaia.com/en/blog/viva-la-boobies/ 301!`,
  // `/de/blog/achtung-risiko-teil-2-unseres-rohkostartikels/ https://www.happygaia.com/de/blog/achtung-risiko-teil-2-unseres-rohkostartikels/ 301!`,
  // `/en/blog/watch-out-for-this-mistake-part-2-of-our-rawfood-article/ https://www.happygaia.com/en/blog/watch-out-for-this-mistake-part-2-of-our-rawfood-article/ 301!`,
  // `/de/blog/wir-gruenden-eine-natuerliche-selbtversorger-siedlung-im-magischen-peru/ https://www.happygaia.com/de/blog/wir-gruenden-eine-natuerliche-selbtversorger-siedlung-im-magischen-peru/ 301!`,
  // `/en/blog/we-are-now-starting-a-self-sustainable-eco-village-in-peru/ https://www.happygaia.com/en/blog/we-are-now-starting-a-self-sustainable-eco-village-in-peru/ 301!`,
  // `/de/blog/wir-im-heiligen-tal-der-inkas/ https://www.happygaia.com/de/blog/wir-im-heiligen-tal-der-inkas/ 301!`,
  // `/en/blog/we-visit-the-sacred-valley-of-the-inka-culture/ https://www.happygaia.com/en/blog/we-visit-the-sacred-valley-of-the-inka-culture/ 301!`,
]
