import RestaurantSource from '../../data/restaurant-source';
import createRestaurantItemTemplate from '../templates/template-creator';

const Home = {
	async render() {
		return `
			<div class="restoran">
				<h2 class="restoran__label">Daftar Restoran</h2>
				<div id="restoran__list" class="restoran__list"></div>
			</div>
		`;
	},

	async afterRender() {
		const restaurants = await RestaurantSource.restaurantList();
		const restaurantContainer = document.querySelector('#restoran__list');
		restaurants.forEach((restaurant) => {
			restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
		});
	}
};

export default Home;