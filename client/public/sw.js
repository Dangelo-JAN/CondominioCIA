const CACHE_NAME = 'ems-cache-v1'

// Al instalar — cachea los assets esenciales
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
            ])
        })
    )
    self.skipWaiting()
})

// Al activar — limpia caches viejos
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            )
        )
    )
    self.clients.claim()
})

// Fetch — network first, cache como fallback
self.addEventListener('fetch', (event) => {
    // Solo cachear GET requests
    if (event.request.method !== 'GET') return

    // No interceptar llamadas a la API
    if (event.request.url.includes('/api/')) return

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                const clone = response.clone()
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, clone)
                })
                return response
            })
            .catch(() => caches.match(event.request))
    )
})
