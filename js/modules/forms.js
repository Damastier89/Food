function form() {
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
};

module.exports = form;