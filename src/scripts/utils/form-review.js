import {formReviewTemplate} from '../views/templates/template-creator';
import RestaurantSource from '../data/restaurant-source';

const FormReview = {
	async init ({formContainer, restaurant}) {
		this._formContainer = formContainer;
		this._restaurant = restaurant;

		await this._renderForm();
	},

	async _renderForm() {
		this._formContainer.innerHTML += formReviewTemplate;
		const addButton = document.querySelector('#addButton');
		const inputName = document.querySelector('#inputName');
		const inputReview = document.querySelector('#inputReview');
		addButton.addEventListener('click', async (e) => {
			e.preventDefault();
			const reviewCustomer = {
				id: this._restaurant.id,
				name: inputName.value,
				review: inputReview.value
			};
			await RestaurantSource.addReview(reviewCustomer);
		});
	}
};

export default FormReview;