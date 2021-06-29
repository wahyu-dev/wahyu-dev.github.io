import API_ENDPOINT from '../globals/api-endpoint';
import Swal from 'sweetalert2';

class RestaurantSource {
	static async restaurantList() {
		const response = await fetch(API_ENDPOINT.LIST_RESTORANT);
		const responseJson = await response.json();
		return responseJson.restaurants;
	}

	static async detailRestorant(id){
		const response = await fetch(API_ENDPOINT.DETAIL(id));
		const responseJson = await response.json();
		return responseJson.restaurant;
	}

	static async addReview(reviewCustomer){
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Auth-Token': '12345'
			},
			body: JSON.stringify(reviewCustomer)
		};

		const response = await fetch(API_ENDPOINT.REVIEW, options);
		const responseJson = await response.json();
		Swal.fire('Result', responseJson.message, 'success').then(() => {
			window.location.reload();
		});
	}
}

export default RestaurantSource;
