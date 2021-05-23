import router from './routes/routes';

addEventListener('fetch', e => {
  e.respondWith(router.handle(e.request));
});
