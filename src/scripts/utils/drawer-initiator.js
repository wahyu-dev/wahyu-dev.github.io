const DrawerInitiator = {
	init({btnToggle, menuToggle, nav}) {
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
         
		menuToggle.addEventListener('click', () => {
        
			nav.classList.toggle('slide');
        
		});
	},
};

export default DrawerInitiator;