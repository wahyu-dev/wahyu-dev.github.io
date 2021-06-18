import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import App from './views/app';


const menuWrapper = document.getElementById('navbar');

const app = new App({
	btnToggle: document.getElementById('btnToggle'),
	menuToggle: document.querySelector('.menu-toggle input'),
	nav: document.querySelector('nav ul'),
	content: document.getElementById('content'),
});

window.addEventListener('hashchange', () => {
	app.renderPage();
});

window.addEventListener('load', () => {
	app.renderPage();
});


window.onscroll = changeBackgroundColor;

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
