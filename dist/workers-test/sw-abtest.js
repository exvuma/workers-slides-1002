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