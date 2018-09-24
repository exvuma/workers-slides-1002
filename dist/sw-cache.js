var CACHE_FILES = [
    // '/whatever-i-want-to-precache.jpg',
    // '/more-precache.html',
    'src/images/xmaskitty.jpg',
    // 'src/safety.html',
    'safety.html',
    'src/safety.html',
    'error.html',
    'src/error.html'
];
var EXCLUDED_FILES = [
    '/src/images/x'
]
var SAFETY_TMP = 'src/safety.html'
var CACHE_VERSION = 'name-of-my-cache';
var preCacheFunc = function () {
    let kitty = fetch('src/images/xmaskitty.jpg')
        .then(resp => {
            return caches.open(CACHE_VERSION)
                .then(function (cache) {
                    return cache.put('/src/kitty.jpg', resp)
                })
        
    })    
}
self.addEventListener('install', function (event) {
    event.waitUntil(preCacheFunc()) 
})
// self.addEventListener('fetch', function (event) {
//     let somesafe = getSomeSafeResp(event.request)
//     console.log('somesage', somesafe)
//     let cacheresp = grabFromCacheOrAdd(event.request)
//     event.respondWith(somesafe)
// });
self.addEventListener('fetch', function (event) {
    let t = grabFromCacheOrAdd(event.request)

    console.log('add', t)
    event.respondWith(t)
});
function getSomeSafeResp(req) {
    return caches.open(CACHE_VERSION).then(function (cache) {
        return cache.match(req).then(function (matching) {
            if (matching) {
                console.log('matched!')
                return matching
            } else {
                console.log('missed!')
                return fetch(req.url)
                .then( (response) =>{
                    if(!response.ok) throw new Error('asdasd')
                    console.log('success in populating the cache with tth response:', response)

                    cache.add(req)
                    
                    return response
                })
                .catch(() => {
                    console.log('askjdaksjd errro!!')
                    t= cache.match(SAFETY_TMP)
                    console.log('templ', t)
                    return t
                })
            }
        });
    });
}
async function grabFromCacheOrAdd(req) {
    // Open the cache to see if we have a matching response
    const cache = await caches.open(CACHE_VERSION)
    const matching = await cache.match(req)
    if (matching) return matching
    // NO matching response, fetch and put into cache
    const res = await fetch(req)
    await cache.put(req.url, res)
    return res
}

