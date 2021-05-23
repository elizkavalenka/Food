window.addEventListener('DOMContentLoaded', () => {
	const tabs = require('./modules/tabs'),
		  timer = require('./modules/timer'),
		  cards = require('./modules/cards'),
		  calc = require('./modules/calc'),
		  modal = require('./modules/modal'),
		  forms = require('./modules/forms'),
		  slider = require('./modules/slider');
	
	tabs();
	timer();
	timer();
	cards();
	calc();
	modal();
	forms();
	slider();


});