import 'regenerator-runtime'; /* for async await transpile */

import '../styles/main.css';

import '../styles/responsive.css';

import  data from '../DATA.json';



const menuToggle = document.querySelector('.menu-toggle input');

const nav = document.querySelector('nav ul');

const menuWrapper = document.getElementById('navbar');

const btnToggle = document.getElementById('btnToggle');



btnToggle.addEventListener('keydown', (e) => {

	if(e.key == ' ' || e.key == 'Enter'){

		if (menuToggle.checked) {

			menuToggle.checked = false;

		}else {

			menuToggle.checked = true;

		}

		nav.classList.toggle('slide');

	}

});



let restaurantElement = '';



data.restaurants.forEach(resto => {

	restaurantElement += `

    <article class="restoran-item">

        <img class="item__thumbnail"

            src="${resto.pictureId}"

            alt="${resto.name}">



            <div class="post-item__content">

                <p class="post-item__date">${resto.city}  <b class="post-item__date__author">${resto.rating}</b>

                </p>

                <h3 class="post-item__title"><a href="#">${resto.name}</a></h3>

                <p class="post-item__description">${resto.description}</p>

            </div>

    </article>

    `;

});



document.getElementById('restoran__list').innerHTML = restaurantElement;



menuToggle.addEventListener('click', () => {

	nav.classList.toggle('slide');

});



function changeBackgroundColor() {

	const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

	if (scrollTop >= 100) {

		menuWrapper.classList.add('bg-dark');

		menuWrapper.classList.remove('bg-transparent');

	}else{

		menuWrapper.classList.add('bg-transparent');

		menuWrapper.classList.remove('bg-dark');

	}

}



window.onscroll = changeBackgroundColor;

