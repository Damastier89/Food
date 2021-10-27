window.addEventListener('DOMContentLoaded', () => {

///////////////////// Tabs ///////////////////////

const tabs = document.querySelectorAll(".tabheader__item");
const tabsContent = document.querySelectorAll(".tabcontent");
const tabsParent = document.querySelector(".tabheader__items");

function hideTabContent() {
	tabsContent.forEach(tabscontent => {
		tabscontent.classList.add("hide");
		tabscontent.classList.remove("show", "fade");

		tabs.forEach(tabheader => {
			tabheader.classList.remove('tabheader__item_active');
		})
	})
}

function showTabContent(i = 0) {
	tabsContent[i].classList.add("show", "fade");
	tabsContent[i].classList.remove("hide");
	tabs[i].classList.add("tabheader__item_active");
}
 
tabsParent.addEventListener("click", (event) => {
	const target = event.target;

	if (target && target.classList.contains("tabheader__item")) {
		tabs.forEach((tabheader, index) => {
			if (target == tabheader) {
				hideTabContent();
				showTabContent(index);
			}
		});
	}
});

hideTabContent();
showTabContent();

 ////////////////////// Timer /////////////////////
const deadLine = '2021-12-31';

function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
				days = Math.floor(t / (1000 * 60 * 60 * 24)), // кол-во милисекунд в дне
				hours = Math.floor((t / (1000 * 60 * 60) % 24)),
				minutes = Math.floor((t / 1000 / 60) % 60),
				seconds = Math.floor((t / 1000) % 60);

		return {
				'total': t,
				'days': days,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
		};
}

function getZero(num) {
		if (num >= 0 && num < 10) {
				return `0${num}`;
		} else {
				return num;
		}
}

function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
				days = timer.querySelector('#days'),
				hours = timer.querySelector('#hours'),
				minutes = timer.querySelector('#minutes'),
				seconds = timer.querySelector('#seconds'),
				timeInterval = setInterval(updateClock, 1000);

		updateClock();

	function updateClock() {
			const t = getTimeRemaining(endtime);

			days.textContent = getZero(t.days);
			hours.textContent = getZero(t.hours);
			minutes.textContent = getZero(t.minutes);
			seconds.textContent = getZero(t.seconds);

			if (t.total <= 0) {
					clearInterval(timeInterval);
			}
	}
};

setClock('.timer', deadLine);

//////////////////////// Modal ///////////////////////

const modalTrigger = document.querySelectorAll("[data-modal]");
const modal = document.querySelector(".modal");

function modalOpen() {
	modal.style.display = "block";
	document.body.style.overflow = "hidden";
	clearInterval(modalTimer); 
};

const modalTimer = setTimeout(modalOpen, 5000);

modalTrigger.forEach( btn => {
	btn.addEventListener("click", modalOpen);
});

function modalClose() {
	modal.style.display = "none";
	document.body.style.overflow = "";
}

modal.addEventListener("click", (event) => {
	if (event.target === modal || event.target.getAttribute('data-close') == '') {
		modalClose();
	}
});

document.addEventListener("keydown", (event) => {
	if (event.code === "Escape") {
		modalClose();
	}
});

function showModalByScroll() {
	let pageYOffset = window.pageYOffset,
	    clientHeight = document.documentElement.clientHeight,
			scrollHeight = document.documentElement.scrollHeight;
	// пользователь долистал до конца страници(скролл с боку + контент стрницы)
	if (pageYOffset + clientHeight >= scrollHeight) {
		modalOpen();
		window.removeEventListener("scroll", showModalByScroll);
	}
};

window.addEventListener("scroll", showModalByScroll);


/////////////////// Class Card ///////////////////

class CardMenu {
	constructor(src, alt, title, description, price, parentSelector, ...classes) { // ...classes -  колличество дополнительных классов
		this.src = src;
		this.alt = alt;
		this.title = title;
		this.description = description;
		this.price = price;
		this.classes = classes; // array
		this.parent = document.querySelector(parentSelector);
		this.transfer = 74;
		this.changeToRubl();
	}

	changeToRubl() {
		this.price = +this.price * this.transfer;
	}

	render() {
		const element = document.createElement("div");

		if (this.classes.length === 0) {
			this.element = "menu__item";
			element.classList.add(this.element);
		} else {
			this.classes.forEach(className => element.classList.add(className));
		} 

		element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.description}</div>
					<div class="menu__item-divider"></div>
						<div class="menu__item-price">
								<div class="menu__item-cost">Цена:</div>
								<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
						</div>
		`;

		this.parent.append(element);
	}
};

async function getData(url) {
	// Данный код асенхронный , ответ может придти не сразу и в переменную 
	// res запишется null или undefined. Для этого успользуем async/await
	// и он будет дожидаться результата запроса
	const request = await fetch(url);

  if (!request.ok) {
		// выкидываем ошибку если ответ не OK
		throw new Error(`Could not fetch ${url}, status: ${request.status}`); 
	};

	return await request.json();
};

// getData(`http://localhost:3000/menu`)
// 	.then(cards => { // перебираем полученный массив 
// 		cards.forEach(({img, altimg, title, descr, price}) => { // используем деструктуризацию для полученного обьекта
// 			new CardMenu(img, altimg, title, descr, price, ".menu .container").render();
// 		});
// 	});

axios.get(`http://localhost:3000/menu`)
	.then(cards => { // перебираем полученный массив
		cards.data.forEach(({img, altimg, title, descr, price}) => { // используем деструктуризацию для полученного обьекта
			new CardMenu(img, altimg, title, descr, price, ".menu .container").render();
		})
	});


// new CardMenu (
// 		"img/tabs/vegy.jpg",
// 		"vegy",
// 		'Меню "Фитнес"',
// 		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
// 		9,
// 		".menu .container",
// 		// не добавляем классы
// ).render(); // данный синтаксис используется если нужно использовать класс один раз

// const vipMenu = new CardMenu (
// 		"img/tabs/elite.jpg",
// 		"elite",
// 		'Меню "Премиум"',
// 		'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
// 		12,
// 		".menu .container",
// 		"menu__item"
// );
// vipMenu.render();

// const leanMenu = new CardMenu (
// 		"img/tabs/post.jpg",
// 		"post",
// 		'Меню "Постное"',
// 		'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
// 		16,
// 		".menu .container",
// 		"menu__item"
// );
// leanMenu.render();

/////////////////// Forms ////////////////////

const forms = document.querySelectorAll('form');

const message = {
	loading: 'img/spinner.svg',
	success: 'Спасибо! Мы скоро свяжемся с вами',
	failuer: 'Что-то пошло не так... о_О',
}

forms.forEach(form => {
	bindPostData(form);
});

async function postData(url, data) {
	// Данный код асенхронный , ответ может придти не сразу и в переменную 
	// res запишется null или undefined. Для этого успользуем async/await
	// и он будет дожидаться результата запроса
	const res = await fetch(url, { 
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: data
	})

	return await res.json();
};

function bindPostData(form) {
	form.addEventListener('submit', (event) => {
		event.preventDefault();

		const statusMessage = document.createElement('img');
		statusMessage.classList.add('status');
		statusMessage.src = message.loading;
		statusMessage.style.cssText = `
			display: block;
			margin: 0 auto;
		`;
		form.insertAdjacentElement('afterend', statusMessage);

		const formData = new FormData(form);

// Преобразуем formData с помощью entries() в массив масивов(матрицу), а после этого
// с помощью Object.fromEntries преобразуем в обьект и далее JSON.stringify.		
		const json = JSON.stringify(Object.fromEntries(formData.entries())) 

		postData(`http://localhost:3000/requests`, json)
		  .then(data => {
				console.log(data);
				showThanksModal(message.success);
				statusMessage.remove();
		}).catch(() => { // если fetch попадает на ошибку связанную с http(404 и т.д.) он не выкинет reject
										 // для него это не ошибка
			showThanksModal(message.failuer);
		}).finally(() => {
			form.reset();
		});

//////////////////////  XMLHttpRequest ///////////////////////
		// const request = new XMLHttpRequest();
		// request.open('POST', 'server.php');

		// request.setRequestHeader('Content-type', 'multipart/form-data') если использовать данный заголовок
		// в связке с XMLHttpRequest(), то будет возникать ошибка. Заголовок проставиться автоматически
		// formData используется в php
		// request.setRequestHeader('Content-type', 'application/json');
		// const formData = new FormData(form); // Всегда проверять наличие атрибута "name" у input

		// const object = {};
		// formData.forEach(function(value, key) { // Перебираем formData т.к. его нельзя передать в JSON
		// 	object[key] = value;
		// });

		// const json = JSON.stringify(object); // Конвертируем в JSON

		// request.send(json);

		// request.addEventListener('load', () => {
		// 	if (request.status === 200) {
		// 		console.log(request.response);
		// 		showThanksModal(message.success);
		// 		form.reset();
		// 		statusMessage.remove();
		// 	} else {
		// 		showThanksModal(message.failuer);
		// 	}
		// });
///////////////////////////////////////////////////////////////
	});
}

function showThanksModal(message) {
	const prevModalDialog = document.querySelector('.modal__dialog');

	prevModalDialog.classList.add('hide');
	modalOpen();

	const thanksModal = document.createElement('div');
	thanksModal.classList.add('modal__dialog');
	thanksModal.innerHTML = `
		<div class="modal__content">
			<div class="modal__close" data-close>×</div>
			<div class="modal__title">${message}</div>
		</div>
	`;

	document.querySelector('.modal').append(thanksModal);
	setTimeout(() => {
		thanksModal.remove();
		prevModalDialog.classList.add('show');
		prevModalDialog.classList.remove('hide');
		modalClose();
	}, 3000);

};

///////////////////// Slider /////////////////////

const slides = document.querySelectorAll('.offer__slide'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next');
const total = document.querySelector('#total'),
      current = document.querySelector('#current');
const slidesWrapper = document.querySelector('.offer__slider-wrapper'),
			slidesField = document.querySelector('.offer_slider-inner'),
			widthBlockSlider = window.getComputedStyle(slidesWrapper).width;

let slideIndex = 1;
let offset = 0;

// slider v.2.0
if (slides.length < 10) {
	total.textContent = `0${slides.length}`;
	current.textContent = `0${slideIndex}`;
} else {
	total.textContent = slides.length;
	current.textContent = slideIndex;
}

// помещаем все слайды во внутрь slidesField
slidesField.style.width = 100 * slides.length + `%`;
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => { // устанавливаем для каждого слайда нужную ширину
	slide.style.width = widthBlockSlider;
})

next.addEventListener('click', () => {
	// Проверяем что это последний слайд
	if (offset == +widthBlockSlider.slice(0, widthBlockSlider.length - 2) * (slides.length - 1)) {
		offset = 0;
	} else {
		offset += +widthBlockSlider.slice(0, widthBlockSlider.length - 2);
	} 
	slidesField.style.transform = `translateX(-${offset}px)`;

	if (slideIndex == slides.length) {
		slideIndex = 1;
	} else {
		slideIndex++;
	};

	if (slides.length < 10) {
    current.textContent = `0${slideIndex}`;
	} else {
		current.textContent = slideIndex;
	}

});

prev.addEventListener('click', () => {
	// Проверяем что это последний слайд
	if (offset == 0) {
		offset = +widthBlockSlider.slice(0, widthBlockSlider.length - 2) * (slides.length - 1)
	} else {
		offset -= +widthBlockSlider.slice(0, widthBlockSlider.length - 2);
	} 
	slidesField.style.transform = `translateX(-${offset}px)`;

	if (slideIndex == 1) {
		slideIndex = slides.length;
	} else {
		slideIndex--;
	};

	if (slides.length < 10) {
    current.textContent = `0${slideIndex}`;
	} else {
		current.textContent = slideIndex;
	}
});

// // slider v.1.0
// ////////////////////////////////////////////////////////////
// showSlides(slideIndex);

// if (slides.length < 10) {
// 	total.textContent = `0${slides.length}`;
// } else {
// 	total.textContent = slides.length;
// }

// function showSlides(index) {
// // если индекс больше колличества слайдов и мы ушли в правую границу,
// // то возвращаемся в начало
// 	if (index > slides.length) {
// 		slideIndex = 1;
// 	};
// // если ушли в отрицательную сторону , то перемещемся в конец
// 	if (index < 1) {
// 		slideIndex = slides.length;
// 	};

// 	slides.forEach(slide => slide.style.display = 'none');
// 	slides[slideIndex - 1].style.display = 'block';

// 	if (slides.length < 10) {
// 		current.textContent = `0${slideIndex}`;
// 	} else {
// 		current.textContent = slideIndex;
// 	}
// };

// function plusSlides(idx) {
// 	showSlides(slideIndex += idx);
// };

// prev.addEventListener('click', () => {
// 	plusSlides(-1)
// });

// next.addEventListener('click', () => {
// 	plusSlides(+1)
// });
//////////////////////////////////////////////////////


















});