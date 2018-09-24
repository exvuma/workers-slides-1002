const CACHE = 'meetup-cache';
URLArr = ['./plugin/zoom-js/zoom.js']
addURLsToCache = (URLs) =>{
    console.log('addurls')
    return caches.open(CACHE)
    .then((cache) =>{
        console.log('adda alls')
        return cache.addAll(URLs)
    })
    .catch((err) =>{
        console.log('There was an error pre caching')
        return Promise.reject('issue')
    })
}
var CACHE_FILES = [
    '/',
    '/lib/css/zenburn.css',
    // '/lib/js/head.min.js',
    '/lib/JOHN.jpg'
];
var CACHE_VERSION = 'app-v1';
self.addEventListener('install', function(event){
    // event.waitUntil(addURLsToCache(URLArr))
    console.log('install service workers')
    event.waitUntil(() => {
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(CACHE_FILES);
            })
    })
    console.log(event);
    console.log('install')
});

self.addEventListener('activate', function(event){
    event.waitUntil(addURLsToCache(URLArr))

});
// self.addEventListener('fetch', function(event){
//     URLArr.push(event.request.url)
//     // return something for each interception
//     console.log('fetching')
//     event.respondWith(grabFromCache(event.request)) 
//     // event.respondWith(new Response('whwate i want'))
// });
function grabFromCache(req) {
    return caches.open(CACHE_VERSION).then(function (cache) {
        // console.log(cache)
        return cache.match(req).then(function (matching) {
            console.log(matching)
            if (matching){
                console.log('match', req.url)
                return matching
            }else{
                console.log('no match',req.url)
                return fetch(req)
                // return matching || Promise.reject('no-match');

            }
         });
    });
}
addEventListener('fetch', event => {
    event.respondWith(ABTestResponse(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */

const name = 'experiment0'
async function ABTestResponse(request) {
    let { isNew, group } = getGroup(request.headers.get('Cookie'))
    let url = new URL(request.url)
    url = '/src/images/' + group + '.png'
    console.log(ur)
    // url = (group === 'control') ? new URL(`https://pas-wordpress-media.s3.amazonaws.com/wp-content/uploads/2012/08/ID-100916651.jpg`) : new URL('http://eventzerz.com/wp-content/uploads/2018/03/Test-Logo-Small-Black-transparent-1.png')
    const modifiedRequest = new Request(url, {
        method: request.method,
        headers: request.headers
    })
    const response = await fetch(modifiedRequest)
    if (isNew) {
        const t = getResponseWithSetCookie(group, response)
        return t
    } else {
        return response
    }
}
async function regResponse(req) {
    return await fetch(new Response(req))
}
function getGroup(cookie) {
    isNew = false;
    if (cookie && cookie.includes(`${name}=control`)) {
        group = 'control'
    } else if (cookie && cookie.includes(`${name}=test`)) {
        group = 'test'
    } else {
        // 50/50 Split
        group = Math.random() < 0.5 ? 'control' : 'test'
        isNew = true
    }
    return { isNew, group }
}
function getResponseWithSetCookie(group, response) {
    let newHeaders = new Headers(response.headers)
    newHeaders.append('Set-Cookie', `${name}=${group}`)
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
    })
}