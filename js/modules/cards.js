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

};

module.exports = cards;