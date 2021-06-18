import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
	static async restaurantList() {
		const response = await fetch(API_ENDPOINT.LIST_RESTORANT);
		const responseJson = await response.json();
		return responseJson.restaurants;
	}
}

export default RestaurantSource;
