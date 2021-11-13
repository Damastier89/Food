/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function calc() {
  const result = document.querySelector('.calculating__result span');

  let sex, height, weight, age,	ratio;
  
  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  };
  
  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  };
  
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
  
    elements.forEach(div => {
      div.classList.remove(activeClass);
  
      if (div.getAttribute('id') === localStorage.getItem('sex')) {
        div.classList.add(activeClass);
      };
  
      if (div.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        div.classList.add(activeClass);
      };
  
    });
  };
  
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  
  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '... '; 
      return;
    };
  
    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    };
  
  };
  
  calcTotal();
  
  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
  
    elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        };
  
        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
  
        e.target.classList.add(activeClass);
  
        calcTotal();
      });
    });
  };
  
  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
  
  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
  
    input.addEventListener('input', () => {
  
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      };
  
      switch(input.getAttribute('id')) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }
  
      calcTotal();
    });
  };
  
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
};

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_apiServices_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/apiServices.js */ "./js/services/apiServices.js");


function cards() {
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
  
  (0,_services_apiServices_js__WEBPACK_IMPORTED_MODULE_0__.getData)(`http://localhost:3000/menu`)
  	.then(cards => { // перебираем полученный массив 
  		cards.forEach(({img, altimg, title, descr, price}) => { // используем деструктуризацию для полученного обьекта
  		  new CardMenu(img, altimg, title, descr, price, ".menu .container").render();
  	  });
    });
  
  // axios.get(`http://localhost:3000/menu`)
  //   .then(cards => { // перебираем полученный массив
  //     cards.data.forEach(({img, altimg, title, descr, price}) => { // используем деструктуризацию для полученного обьекта
  //       new CardMenu(img, altimg, title, descr, price, ".menu .container").render();
  //     })
  //   });
  
  
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

};

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./js/modules/modal.js");
/* harmony import */ var _services_apiServices_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/apiServices.js */ "./js/services/apiServices.js");



function form(formSelector, modalTimer) {
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/spinner.svg',
    success: 'Спасибо! Мы скоро свяжемся с вами',
    failuer: 'Что-то пошло не так... о_О',
  }

  forms.forEach(form => {
    bindPostData(form);
  });


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

      ;(0,_services_apiServices_js__WEBPACK_IMPORTED_MODULE_1__.postData)(`http://localhost:3000/requests`, json)
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
    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.modalOpen)('.modal', modalTimer);

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
      (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.modalClose)('.modal');
    }, 3000);

  };
};

/* harmony default export */ __webpack_exports__["default"] = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "modalOpen": function() { return /* binding */ modalOpen; },
/* harmony export */   "modalClose": function() { return /* binding */ modalClose; }
/* harmony export */ });
function modalOpen(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
  
  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId); 
  }
  
};

function modalClose(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = "none";
  document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modalTrigger = document.querySelectorAll(triggerSelector);
  const modal = document.querySelector(modalSelector);

  modalTrigger.forEach( btn => {
    btn.addEventListener("click", () => modalOpen(modalSelector, modalTimerId));
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
      modalClose(modalSelector);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      modalClose(modalSelector);
    }
  });

  function showModalByScroll() {
    let pageYOffset = window.pageYOffset,
        clientHeight = document.documentElement.clientHeight,
        scrollHeight = document.documentElement.scrollHeight;
    // пользователь долистал до конца страници(скролл с боку + контент стрницы)
    if (pageYOffset + clientHeight >= scrollHeight) {
      modalOpen(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  };

  window.addEventListener("scroll", showModalByScroll);
  
};

/* harmony default export */ __webpack_exports__["default"] = (modal);

 

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

  let slideIndex = 1;
  let offset = 0;
  
  const slider = document.querySelector(container), 
        slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow);
  const total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter);
  const slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field);

  let widthBlockSlider = window.getComputedStyle(slidesWrapper).width;

    window.addEventListener('resize', () => {
      widthBlockSlider = window.getComputedStyle(slidesWrapper).width;
      const width = parseInt(widthBlockSlider, 10);

      offset = width * (slideIndex - 1);
      slidesField.style.transition = '';
      slidesFieldStyle();
      setTimeout(() => {
        slidesField.style.transition = '0.5s all';
      });
    })

  // slider v.2.0
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  // помещаем все слайды во внутрь slidesField
  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => { // устанавливаем для каждого слайда нужную ширину
    slide.style.width = '100%';
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol');
  const dots = [];
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;

  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);

    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);

  };

  next.addEventListener('click', () => {
    // Проверяем что это последний слайд
    if (offset == +widthBlockSlider.slice(0, widthBlockSlider.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +widthBlockSlider.slice(0, widthBlockSlider.length - 2);
    };

    slidesFieldStyle();

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    };

    addZeroToCount();
    dotsStyle();

  });

  prev.addEventListener('click', () => {
    // Проверяем что это последний слайд
    if (offset == 0) {
      offset = +widthBlockSlider.slice(0, widthBlockSlider.length - 2) * (slides.length - 1);
    } else {
      offset -= +widthBlockSlider.slice(0, widthBlockSlider.length - 2);
    };

    slidesFieldStyle();

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    };

    addZeroToCount();
    dotsStyle();

  });

  dots.forEach(dot => {
    dot.addEventListener('click', (event) => {
      const slideTo = event.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = +widthBlockSlider.slice(0, widthBlockSlider.length - 2) * (slideTo - 1);

      slidesFieldStyle();
      addZeroToCount();
      dotsStyle();

    });
  });

  function dotsStyle() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  };

  function slidesFieldStyle() {
    slidesField.style.transform = `translateX(-${offset}px)`;
  };

  function addZeroToCount() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    };
  };

  function deleteNotDidits(str) {
    return +str.replace(/\D/g, '')
  }
  
};

/* harmony default export */ __webpack_exports__["default"] = (slider);




/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, tabsActiveClass) {
  const tabs = document.querySelectorAll(tabsSelector);
  const tabsContent = document.querySelectorAll(tabsContentSelector);
  const tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach(tabscontent => {
      tabscontent.classList.add("hide");
      tabscontent.classList.remove("show", "fade");

      tabs.forEach(tabheader => {
        tabheader.classList.remove(tabsActiveClass);
      })
    })
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add(tabsActiveClass);
  }
  
  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
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

};

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(id, deadLine) {

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
			};
		}
  };

  setClock(id, deadLine);

};

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/services/apiServices.js":
/*!************************************!*\
  !*** ./js/services/apiServices.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": function() { return /* binding */ postData; },
/* harmony export */   "getData": function() { return /* binding */ getData; }
/* harmony export */ });
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









window.addEventListener('DOMContentLoaded', () => {
	const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.modalOpen)(".modal", modalTimer), 50000);
	
	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2021-12-31');
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"])({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner',
	});
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimer);
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimer);
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__["default"])();
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();

});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map