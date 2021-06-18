import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `

<article class="restoran-item">

    <img class="item__thumbnail"

        src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}"

        alt="${restaurant.name}">

        <div class="post-item__content">

            <p class="post-item__date">${restaurant.city}  <b class="post-item__date__author">${restaurant.rating}</b>

            </p>

            <h3 class="post-item__title"><a href="#">${restaurant.name}</a></h3>

            <p class="post-item__description">${restaurant.description}</p>

        </div>

</article>

`;

export default createRestaurantItemTemplate;
