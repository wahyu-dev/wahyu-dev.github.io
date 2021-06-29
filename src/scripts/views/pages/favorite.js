import FavoriteRestaurantIdb from '../../data/restaurant-db';
import {createRestaurantItemTemplate} from '../templates/template-creator';

const Favorite = {
	async render() {
		return `
			<div class="restoran">
				<h2 class="restoran__label">Daftar Restoran Favorite</h2>
				<div id="restoran__list" class="restoran__list"></div>
				<div id="wrapper"></div>
			</div>
		`;
	},

	async afterRender() {
		const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
		const restaurantContainer = document.querySelector('#restoran__list');
		const wrapper = document.querySelector('#wrapper');
		if (restaurants.length == 0) {
			wrapper.innerHTML += '<p class="text-center">Tidak ada restoran favorite</p>';
		}
		restaurants.forEach((restaurant) => {
			restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
		});
	}
};

export default Favorite;