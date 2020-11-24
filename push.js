let webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BMF8rIa_nA_OVArYV9J9ICTGCyS2d8ao8sTKv_QKsV1hczJ0NtczToLrFft7NYtU5DStN8056SiQlhlvk7KfrU4",
   "privateKey": "EzUG6tly0ZhJLcTAMWUpOiFcbAdgGumyn3UA6wf9JWI"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
let pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cDvlPL9Cf6M:APA91bFLgP4I0DjGh0HU1j41wVzJQxUJw09CpkpuZLLlfksf85ytG5gehM478QGp1XDXmJGfrGET_NP4B4DcnQgxd4xVfdqw0RanpNBqXYD1WkAI3vX5Mz5PvdS5H_QRBzd5_s25fU90",
   "keys": {
       "p256dh": "BCidfTMGNi8JcHUq3s8hryS3Y1VR5EYHbzRl63gn/lBiwCoeWwC4AlcOfm0oB5cxwWoCKTgghL3hmRqiKeVbp6s=",
       "auth": "ZEJMHPLsFaB+r0caVy69MA=="
   }
};

let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
let options = {
   gcmAPIKey: '578463380492',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);