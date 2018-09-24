export async function WAPush () {
    console.log('was')
    // const registration = await
    Notification.requestPermission(function (status) {
        console.log('Notification permission status:', status);
    });
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function (reg) {

            // TODO 2.4 - Add 'options' object to configure the notification

            reg.showNotification('Hello world!');
        });
    }
    const vapidKeys = webpush.generateVAPIDKeys();
    navigator.serviceWorker.ready
        .then(function (registration) {
            console.log('red')
            return registration.pushManager.getSubscription()
                .then(async function (subscription) {
                    if (subscription) {
                        console.log(subscription)
                        return subscription;
                    }
                    const response = await fetch('./vapidPublicKey');
                    const vapidPublicKey = await response.text();
                    const convertedVapidKey = vapidPublicKey//urlBase64ToUint8Array(vapidPublicKey);
                    return registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: convertedVapidKey
                    });
                });
        }).then(function (subscription) {
            console.log('fetching')
    
            fetch('./register', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    subscription: subscription
                }),
            });
    
        });
    document.getElementById('doIt').onclick = function () {
        const payload = document.getElementById('notification-payload').value;
        const delay = document.getElementById('notification-delay').value;
        const ttl = document.getElementById('notification-ttl').value;


        fetch('./sendNotification', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                subscription: subscription,
                payload: payload,
                delay: delay,
                ttl: ttl,
            }),
        });
    };
}