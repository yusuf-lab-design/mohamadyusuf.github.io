importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
} else {
  console.log(`Workbox gagal dimuat`);
}

const CACHE_NAME = 'subm-pwa2';

workbox.precaching.precacheAndRoute([
  { url: '/', revision: '1' },
  { url: 'js/db.js', revision: '1' },
  { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
  { url: 'js/idb.js', revision: '1' },
  { url: 'js/indexedDB.js', revision: '1' },
  { url: 'js/match.js', revision: '1' },
  { url: '/css/style.css', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: 'js/nav.js', revision: '1' },
  { url: 'js/team-detail.js', revision: '1' },
  { url: 'js/team.js', revision: '1' },
  { url: 'js/main.js', revision: '1' },
  { url: 'js/teamsaved.js', revision: '1' },
  { url: '/push.js', revision: '1' },
  { url: '/pages/contact.html', revision: '1' },
  { url: '/pages/favorite.html', revision: '1' },
  { url: '/pages/home.html', revision: '1' },
  { url: '/pages/inggris.html', revision: '1' },
  { url: '/detail_teams.html', revision: '1' },
  { url: '/icon512.png', revision: '1' },
  { url: '/icon192.png', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/nav.html', revision: '1' },
],
{
ignoredUrlParametersMatching:[/.*/], 
});

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org"),
  workbox.strategies.staleWhileRevalidate({
      cacheName: "liga-inggris",
  })
);

workbox.routing.registerRoute(
  new RegExp('/index.html'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'index'
  })
);

workbox.routing.registerRoute(
  new RegExp('/nav.html'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'nav'
  })
);

workbox.routing.registerRoute(
  new RegExp('https://crests.football-data.org/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-image'
  })
);

workbox.routing.registerRoute(
  new RegExp('/detail_teams.html'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'detail-team'
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  }),
);


// const urlsToCache = [
//   "/",
//   "js/db.js",
//   "https://fonts.googleapis.com/icon?family=Material+Icons",
//   "js/idb.js",
//   "js/indexedDB.js",
//   "js/match.js",
//   "/css/style.css",
//   "/css/materialize.min.css",
//   "/js/materialize.min.js",
//   "js/nav.js",
//   "js/team-detail.js",
//   "js/team.js",
//   "js/main.js",
//   "js/teamsaved.js",
//   "/push.js",
//   "/pages/contact.html",
//   "/pages/favorite.html",
//   "/pages/home.html",
//   "/pages/inggris.html",
//   "/detail_teams.html",
//   "/icon512.png",
//   "/icon192.png",
//   "/index.html",
//   "/manifest.json",
//   "/nav.html",
    
// ];

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
//   );
// });

// self.addEventListener("fetch", function(event) {
//   var base_url = "https://api.football-data.org/v2/";
//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function(cache) {
//         return fetch(event.request).then(function(response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request,{ ignoreSearch:true }).then(function(response) {
//         return response || fetch (event.request);
//       })
//     )
//   }
// });

// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             console.log(`Service Worker: cache ${cacheName} dihapus`);
//             return caches.delete(cacheName);
//           }
//         }),
//       );
//     }),
//   );
// });

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
