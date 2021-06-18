import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
	constructor({btnToggle, menuToggle, nav, content}) {
		this._btnToggle = btnToggle;
		this._menuToggle = menuToggle;
		this._nav = nav;
		this._content = content;

		this._initialAppShell();
	}

	_initialAppShell() {
		DrawerInitiator.init({
			btnToggle: this._btnToggle,
			menuToggle: this._menuToggle,
			nav: this._nav,
		});
	}

	async renderPage() {
		const url = UrlParser.parseActiveUrlWithCombiner();
		const page = routes[url];
		this._content.innerHTML = await page.render();
		await page.afterRender();
	}
}

export default App;