window.addEventListener('DOMContentLoaded', () => {

//////////////////////tabs///////////////////////

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

 /////////////////////////timer/////////////////////
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

    // ////////////////////////Modal///////////////////////

    // const modalBtn = document.querySelectorAll('[data-modal]');
    // const modal = document.querySelector('.modal');
    // const modalCloseBtn = document.querySelector('[data-close]');

    // function modalOpen() {
    //     modal.style.display = 'block';
    //     document.body.style.overflow = 'hidden';
    //     clearInterval(modalTimer);
    // }

    // modalBtn.forEach(btn => {
    //     btn.addEventListener('click', modalOpen);
    // });

    // function modalClose() {
    //     modal.style.display = 'none';
    //     document.body.style.overflow = '';
    // }

    // modalCloseBtn.addEventListener('click', modalClose);

    // modal.addEventListener('click', (e) => {
    //     if (e.target === modal) {
    //         modalClose();
    //     }
    // });

    // document.addEventListener('keydown', (e) => {
    //     if (e.code === "Escape") {
    //         modalClose();
    //     }
    // });

    // const modalTimer = setTimeout(modalOpen, 5000);

    // function showModalByScroll() {
    //     // пользователь долистал до конца страници(скролл с боку + контент стрницы)
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    //         modalOpen();
    //         window.removeEventListener('scroll', showModalByScroll);
    //     }
    // }

    // window.addEventListener('scroll', showModalByScroll);

    // ////////////Class Card//////////////

    // class MenuCard {
    //     constructor(src, alt, title, descr, price, parentSelector, ...classes) {
    //         this.src = src;
    //         this.alt = alt;
    //         this.title = title;
    //         this.descr = descr;
    //         this.price = price;
    //         this.classes = classes;
    //         this.parent = document.querySelector(parentSelector);
    //         this.transfer = 73;
    //         this.changeToRu();
    //     }

    //     changeToRu() {
    //         this.price = +this.price * this.transfer;
    //     }

    //     render() {
    //         const element = document.createElement('div');
    //         if (this.classes.length === 0) {
    //             this.element = 'menu__item';
    //             element.classList.add(this.element);
    //         } else {
    //             this.classes.forEach(className => element.classList.add(className));
    //         }
    //         element.innerHTML = `
    //                 <img src=${this.src} alt=${this.alt}>
    //                 <h3 class="menu__item-subtitle">${this.title}</h3>
    //                 <div class="menu__item-descr">${this.descr}</div>
    //                 <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">Цена:</div>
    //                     <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
    //                 </div>       
    //         `;
    //         this.parent.append(element);
    //     }
    // }

    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     ".menu .container",
    //     "menu__item"
    // ).render(); // данный синтаксис используется если нужно использовать класс один раз

    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню "Премиум"',
    //     'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     12,
    //     ".menu .container",
    //     "menu__item"
    // ).render();

    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     16,
    //     ".menu .container",
    //     "menu__item"
    // ).render();








});