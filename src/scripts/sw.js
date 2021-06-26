/* eslint-disable no-undef */
import 'regenerator-runtime';
import CacheHelper from '../scripts/utils/chache-helper';

const { assets } = global.serviceWorkerOption;

self.addEventListener('install', (event) => {
	event.waitUntil(CacheHelper.cachingAppShell([...assets, './']));
});

self.addEventListener('activate', (event) => {
	event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
	event.respondWith(CacheHelper.revalidateCache(event.request));
});