import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `

<article class="restoran-item">

    <img class="item__thumbnail lazyload"

      data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}"

        alt="${restaurant.name}">

        <div class="post-item__content">

            <p class="post-item__date">${restaurant.city}  <b class="post-item__date__author">${restaurant.rating}</b>

            </p>

            <h3 class="post-item__title"><a href="#/detail/${restaurant.id}">${restaurant.name}</a></h3>

            <p class="post-item__description">${restaurant.description}</p>

        </div>

</article>

`;

const createRestaurantDetailTemplate = (restaurant) => `
<img class="restaurant__poster lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
<div class="restaurant__info" id="restaurant__info">
  <h3>${restaurant.name} (${restaurant.rating} <i class="fa fa-star checked" aria-hidden="true"></i>)</h3>
  <p>${restaurant.address}, ${restaurant.city}</p>
  <br>
  <p id="foods"><b>Foods</b> : </p>
  <br>
  <p id="drinks"><b>Drinks</b> : </p>
  <br>
</div>
<div class="restaurant__overview">
  <h3>Description</h3>
  <p>${restaurant.description}</p>
  <br>
  <h3>Customer review</h3>
  <br>
  <div id="review_container" class="review_container"></div>
  <br>
  <h3>Add review</h3>
  <br>
  <div id="form_container"></div>
</div>
`;

const customerReviewItemTemplate = (review) => `
    <div class="review">
      <h4>${review.name}</h4>
      <p class="review_note">${review.review}</p>
      <p class="review_date">${review.date}</p>
    </div>
`;

const categoriesTemplate = (category) => `
  <span class="category">${category.name}</span>
`;

const menuFoodsTemplate = (food) => `<span>${food.name}, </span>`;

const menuDrinksTemplate = (drink) => `<span>${drink.name}, </span>`;

const formReviewTemplate = `
<div class="form_wrapper">
  <form>
    <label for="name">Name</label>
    <input type="text" id="inputName" name="name" placeholder="Your name..">

    <label for="note">Review</label>
    <input type="text" id="inputReview" name="note" placeholder="Your review..">

    <button class="btnAdd" id="addButton">Submit<button>
  </form>
</div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
	createRestaurantItemTemplate,
	createRestaurantDetailTemplate,
	createLikeButtonTemplate,
	createLikedButtonTemplate,
	categoriesTemplate,
	menuFoodsTemplate,
	menuDrinksTemplate,
	customerReviewItemTemplate,
	formReviewTemplate
};
