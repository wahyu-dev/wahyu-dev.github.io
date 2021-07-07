import {formReviewTemplate} from '../views/templates/template-creator';
import RestaurantSource from '../data/restaurant-source';
import Swal from 'sweetalert2';

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
			if (window.navigator.onLine){
				await RestaurantSource.addReview(reviewCustomer);
			}else {
				Swal.fire('Warning', 'Lost Connection', 'error');
			}
		});
	}
};

export default FormReview;