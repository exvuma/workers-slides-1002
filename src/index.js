// include index.html for webpack to load
require("reveal.js/lib/js/head.min.js")
// require("./src/index.html");
const Reveal = require('reveal.js')
require('reveal.js/css/reveal.css')
// require('reveal.js/css/theme/night.css')
require('reveal.js/css/theme/solarized.css')
require('reveal.js/lib/css/zenburn.css')

Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,
    
    transition: 'slide', // none/fade/slide/convex/concave/zoom
    
    // More info https://github.com/hakimel/reveal.js#dependencies
    dependencies: [
        { src: 'plugin/markdown/marked.js', condition: function () { return !!document.querySelector('[data-markdown]'); } },
        { src: 'plugin/markdown/markdown.js', condition: function () { return !!document.querySelector('[data-markdown]'); } },
        { src: 'plugin/highlight/highlight.js', async: true, callback: function () { hljs.initHighlightingOnLoad(); } },
        { src: 'plugin/search/search.js', async: true },
        { src: 'plugin/zoom-js/zoom.js', async: true },
        { src: 'plugin/notes/notes.js', async: true }
    ]
});

window.Reveal = Reveal;
// console.log('foo')
Reveal.addEventListener('fragmentshown', function (event) {
    // event.fragment = the fragment DOM element
    // console.log(event.fragment)
});
Reveal.addEventListener('fragmenthidden', function (event) {
    // event.fragment = the fragment DOM element
    // console.log(event.fragment)
});

