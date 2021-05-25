const staticMadzia = "madzia-liczy"
const assets = [
  "/",
  "/index.html",
  "/styles/style.css",
  "/styles/script.js",
  "/styles/jquery-1.10.1.min.js",
  "/assets/AvatarM.png",
  "/assets/dog.png",
  "/assets/doggy.mp3",
  "/assets/funny.mp3",
  "/assets/horse.mp3",
  "/assets/icon-192x192.png",
  "/assets/icon-256x256.png",
  "/assets/icon-384x384.png",
  "/assets/icon-512x512.png",
  "/assets/logo.png",
  "/assets/unicorn.png",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticMadzia).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })