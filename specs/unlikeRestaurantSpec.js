/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../src/scripts/data/restaurant-db';
import * as TestFactories from './helpers/test-factories';

const addLikeButtonContainer = () => {
	document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Unliking A Restaurant', () => {
	beforeEach(async () => {
		addLikeButtonContainer();
		await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
	});

	afterEach(async () => {
		await FavoriteRestaurantIdb.deleteRestaurant(1);
	});

	it('should display unlike widget when the Restaurant has been liked', async () => {
		await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

		expect(document.querySelector('[aria-label="unlike this restaurant"]'))
			.toBeTruthy();
	});

	it('should not display like widget when the Restaurant has been liked', async () => {
		await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

		expect(document.querySelector('[aria-label="like this restaurant"]'))
			.toBeFalsy();
	});

	it('should be able to remove liked Restaurant from the list', async () => {
		await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

		document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

		expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
	});

	it('should not throw error if the unliked Restaurant is not in the list', async () => {
		await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

		// hapus dulu restoran dari daftar restoran yang disukai
		await FavoriteRestaurantIdb.deleteRestaurant(1);

		// kemudian, simulasikan pengguna menekan widget batal menyukai restoran
		document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

		expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
	});
});
