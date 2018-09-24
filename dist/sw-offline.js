
var EXCLUDED_FILES = [
    '/src/images/x'
]
var cache_files = [
    'safety.html',
        'src/safety.html',
        'error.html',
        'src/error.html'
    
]
var SAFETY_TMP = 'src/safety.html'
var ERROR_TMP = 'src/error.html'
var CACHE_VERSION = 'name-of-my-cache';
var DIST_TEMP = '/index_bundle.js'
var preCacheFunc = function(){
    return caches.open(CACHE_VERSION)
        .then(function (cache) {
            cache.add(DIST_TEMP)
            cache.addAll(cache_files)
            cache.add(ERROR_TMP)
            return cache.add(SAFETY_TMP);

        })
}
self.addEventListener('install', function (event) {
    event.waitUntil(preCacheFunc()) 
})
self.addEventListener('fetch', function (event) {
    let url = new URL(event.request.url)
    if (url.pathname.indexOf('/wsj.html') === -1 )
    return    
    console.log('fetch', event.request.url)
    return event.respondWith(fetch(event.request)
        .then(resp => {
            if (!resp.ok) {
                return grabFromCacheOrAdd(ERROR_TMP)
            }
            if (!navigator.onLine) return grabFromCacheOrAdd(SAFETY_TMP)
            return resp
        })
        .catch(error => {
            return grabFromCacheOrAdd(SAFETY_TMP)
        })
    )}
);
function grabFromCacheOrAdd(req) {
    return caches.open(CACHE_VERSION).then(function (cache) {
        return cache.match(req).then(function (matching) {
            if (matching) {
                return matching
            } else {
                return cache.add(req)
            }
        });
    });
}