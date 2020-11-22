// Push Notification

// Periksa fitur Notifikasi API
if ("Notification" in window) {
    requestPermission();
} else {
    console.log("The browser does not support notifications.");
}

function requestPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (result) {
        if (result === "denied") {
          console.log("Fitur notifikasi tidak diijinkan.");
          return;
        } else if (result === "default") {
          console.error("Pengguna menutup kotak dialog permintaan ijin.");
          return;
        }
        navigator.serviceWorker.ready.then(() => {
            if(('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                      userVisibleOnly:true,
                      applicationServerKey: urlBase64ToUint8Array("BPd6Tdd0iLtlydGnXRRBhsWZj20Z75sg-hx18RAOU6zf3j36vjuUHprQDp44ZsYhT3n3NjNzOsHzhXPxmMRnUq0")
                    }).then(function(subscribe) {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('auth')))));
                    })
                    
                });
           }
        })
        
        
     });
   }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

