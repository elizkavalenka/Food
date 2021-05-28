require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import modal from './modules/modal';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
	
	tabs('.tabheader__item','.tabcontent', '.tabheader__items', 'tabheader__item_active');
	timer('.timer', '2021-08-06');
	modal('[data-modal]', '.modal', modalTimerId);
	forms('form', modalTimerId);
	cards();
	calc();
	slider({
		container: '.offer__slider',
		wrapper: '.offer__slider-wrapper', 
		field: '.offer__slider-inner',
		slide: '.offer__slide', 
		prevArrow: '.offer__slider-prev',
		nextArrow: '.offer__slider-next',
		totalCounter: '#total',
		currentCounter: '#current'
	});
});