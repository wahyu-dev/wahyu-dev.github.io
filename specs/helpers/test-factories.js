import LikeButtonPresenter from '../../src/scripts/utils/like-button-initiator';

const createLikeButtonPresenterWithRestaurant = async (Restaurant) => {
	await LikeButtonPresenter.init({
		likeButtonContainer: document.querySelector('#likeButtonContainer'),
		Restaurant,
	});
};

export { createLikeButtonPresenterWithRestaurant };