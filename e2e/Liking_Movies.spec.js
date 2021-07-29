/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurant');

Before((I) => {
	I.amOnPage('/#/favorite');
});

// menyukai salah satu restoran
Scenario('Liked one of the restaurants', async (I) => {
	I.see('Tidak ada restoran favorite', '.text-center');
  
	I.amOnPage('/');
  
	I.seeElement('.post-item__title a');
  
	const firstRestaurant = locate('.post-item__title a').first();
	const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
	I.click(firstRestaurant);
  
	I.seeElement('#likeButton');
	I.click('#likeButton');
  
	I.amOnPage('/#/favorite');
	I.seeElement('.restoran-item');
	const likedRestaurantTitle = await I.grabTextFrom('.post-item__title');
  
	assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});