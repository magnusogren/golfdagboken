const knapp = document.querySelector('#omdomeSwitch');
const omdome = document.querySelector('#omdomeFonster');

knapp.addEventListener('change', () => {
	console.log('test');
	omdome.classList.toggle('hidden');
});
