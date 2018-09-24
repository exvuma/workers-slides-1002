// var webPush = require('web-push');

self.addEventListener('push', function (event) {
        event.waitUntil(
    self.registration.showNotification('ServiceWorker Cookbook', {
        body: 'this body',
    })
  );
});
self.addEventListener('fetch', function (event) {
    console.log('fetching in SW')
    if (event.request.url.endsWith('register')){
        event.respondWith('asda')
    }
    if (event.request.url.endsWith('vapidPublicKey')){
        let rando = Math.random() * 100
        resp= new Response(rando)
        event.respondWith(resp)
    }
});
self.addEventListener('notificationclose', function (e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;

    console.log('Closed notification: ' + primaryKey);
});