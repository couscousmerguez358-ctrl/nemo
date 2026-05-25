const CACHE_NAME = "learnow-wasm-cache-v1";

const WASM_ASSETS = [
  // Pyodide (Python WebAssembly) assets
  "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js",
  "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide-lock.json",
  "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.asm.js",
  "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.asm.wasm",
  
  // SQL.js (SQLite WebAssembly) assets
  "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js",
  "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.wasm"
];

// On install, prefetch and cache all heavy WASM assets in background
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Prefetching WebAssembly assets into CacheStorage...");
      return cache.addAll(WASM_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Clean up old caches on activation
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[Service Worker] Removing old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Cache-First strategy for WASM assets to ensure instant 0ms loads
self.addEventListener("fetch", (event) => {
  const requestUrl = event.request.url;
  
  // Only intercept CDNs loaded in the prefetch list
  const isWasmAsset = WASM_ASSETS.some(asset => requestUrl.includes(asset));

  if (isWasmAsset) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log("[Service Worker] Instant hit from CacheStorage for WASM asset:", requestUrl);
          return cachedResponse;
        }
        
        // Fallback to network and cache it dynamically if not cached yet
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic" && response.type !== "cors") {
            return response;
          }
          
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        });
      })
    );
  }
});
