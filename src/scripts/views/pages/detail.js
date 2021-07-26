import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import LikeButtonPresenter from '../../utils/like-button-initiator';
import FormReview from '../../utils/form-review';
import {createRestaurantDetailTemplate, categoriesTemplate, menuFoodsTemplate, menuDrinksTemplate, customerReviewItemTemplate} from '../templates/template-creator';

const Detail = {
	async render() {
		return `
			<h2 class="detail__label">Detail Restaurant</h2>
			<div id="restaurant" class="restaurant"></div>
			<div id="likeButtonContainer"></div>
        `;
	},

	async afterRender() {
		const url = UrlParser.parseActiveUrlWithoutCombiner();
		const restoran = await RestaurantSource.detailRestorant(url.id);
		const restaurantContainer = document.querySelector('#restaurant');

		restaurantContainer.innerHTML += createRestaurantDetailTemplate(restoran);
		const restoranCategory = document.querySelector('#restaurant__info');
		restoran.categories.forEach(category => {
			restoranCategory.innerHTML += categoriesTemplate(category);
		});
		const menuFoods = document.querySelector('#foods');
		restoran.menus['foods'].forEach((foods) => {
			menuFoods.innerHTML += menuFoodsTemplate(foods);
		});
		const menuDrinks = document.querySelector('#drinks');
		restoran.menus['drinks'].forEach((drink) => {
			menuDrinks.innerHTML += menuDrinksTemplate(drink);
		});
		const reviewContainer = document.querySelector('#review_container');
		restoran.customerReviews.forEach((review) => {
			reviewContainer.innerHTML += customerReviewItemTemplate(review);
		});

		FormReview.init({formContainer: document.querySelector('#form_container'), restaurant: restoran});	
		
		LikeButtonPresenter.init({
			likeButtonContainer: document.querySelector('#likeButtonContainer'),
			Restaurant : {
				id: restoran.id,
				name: restoran.name,
				description: restoran.description,
				city: restoran.city,
				rating: restoran.rating,
				pictureId: restoran.pictureId
			},
		});
	},
};

export default Detail;
