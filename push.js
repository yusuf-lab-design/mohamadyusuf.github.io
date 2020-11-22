var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BPd6Tdd0iLtlydGnXRRBhsWZj20Z75sg-hx18RAOU6zf3j36vjuUHprQDp44ZsYhT3n3NjNzOsHzhXPxmMRnUq0",
    "privateKey": "ebhNb9MjZZDjaKpB8aIbTEl1ML29D3GPpHVUvT0I3Pk"
};

webPush.setVapidDetails(
    'mailto:jejemohamadyusuf@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubcription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dWN7bW_Mzuc:APA91bEQj0H9Obo05BVo-6FZ17y8moj58KkjX94N7sD7nJZ9SPwSP-Uqe56ToFEq-aH3x18CD2qE0CHa-orbAsLpUD4HZrA7afW1J5hhUqdLZhVnomOafNZIg8GLZhrt9k-dKjITUTJ1",
    "keys" : {
        "p256dh":"BPRND56WeMspU0fsWt6aJbw42ip8lmSQHXz+BKDDP5Rc0LmPdUmHeY5DauSi0DdCkdNcVZckPR3aJTSeLIGBZKA=",
        "auth": "2SAxH/KTDBrsikR3LQtS3g=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '395279909961',
    TTL: 60
};
webPush.sendNotification(
    pushSubcription,
    payload,
    options
);