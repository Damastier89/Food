import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import modal from './modules/modal';
import forms from './modules/forms';
import cards from './modules/cards';
import calc from './modules/calc';
import { modalOpen } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
	const modalTimer = setTimeout(() => modalOpen(".modal", modalTimer), 50000);
	
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	timer('.timer', '2022-12-31');
	slider({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner',
	});
	modal('[data-modal]', '.modal', modalTimer);
	forms('form', modalTimer);
	cards();
	calc();

});