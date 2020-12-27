window.addEventListener('DOMContentLoaded', function() {
  /* ********** Tabs ********** */

  var tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items'),
      tabHeaderItem = document.querySelectorAll('.tabheader__item');

  function hideTabContent() {
    tabsContent.forEach(function(item) {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabHeaderItem.forEach(function(item) {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    tabHeaderItem[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', function(event) {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabHeaderItem.forEach(function(item, i) {
        if (target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });



  /* ********** Timer ********** */

  /* Timer navigation */
  var deadLine = '2020-12-31';

  /* Count remaining time and return an object with this data */
  function getRemainingTime(finalTime) {
    var t = Date.parse(finalTime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor(t / (1000 * 60 * 60) % 24),
        minutes = Math.floor(t / (1000 * 60) % 60),
        seconds = Math.floor(t / 1000 % 60);

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  /* Add zero */
  function getZero(num) {
    if (num >=0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  /* Set clock */
  function setClock(selector, finalTime) {
    var timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);
      
      updateClock();

      /* Update clock */
      function updateClock() {
        var dataTime = getRemainingTime(deadLine);

        days.innerHTML = getZero(dataTime.days);
        hours.innerHTML = getZero(dataTime.hours);
        minutes.innerHTML = getZero(dataTime.minutes);
        seconds.innerHTML = getZero(dataTime.seconds);

        if (dataTime.total <= 0) {
          clearInterval(timeInterval);
        }
      }
  }

  setClock('.timer', deadLine);



  /* ********** Modal ********** */

  var modalOpenBtn = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal');

  /* Function - Open modal */
  function openModal() {
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  /* Function - Close modal */
  function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
  }

  /* Open modal */
  modalOpenBtn.forEach(function(btn) {
    btn.addEventListener('click', openModal);
  });

  /* Close modal by "Escape" key */
  document.addEventListener('keydown', function(event) {
    if (event.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  /* Close modal by click outside or close button */
  modal.addEventListener('click', function(event) {
    if(event.target === modal || event.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  /* Set interval to open modal in 5 seconds */
  var modalTimerId = setInterval(openModal, 50000);

  /* Show modal by scroll till the end */
  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      document.removeEventListener('scroll', showModalByScroll);
    }
  }

  document.addEventListener('scroll', showModalByScroll);


  /* ********** Constructor ********** */

  class MenuCard {
    constructor(src, alt, title, descr, price, parentElement) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.transfer = 28;
      this.parent = document.querySelector(parentElement);
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      var element = document.createElement('div');

      element.innerHTML = 
      `
        <div class="menu__item">
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container'
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    '.menu .container'
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    21,
    '.menu .container'
  ).render();


  /* ********** Forms ********** */

  const forms = document.querySelectorAll('form'); /* Получаем все формы со страницы */
  const message = { /* Объект, содержащий варианты ответов в зависимости от ответа сервера */
        loading: './img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
  };

  function postData(form) { /* Функция будет отвечать за отправку данных. Передаем в нее все формы со страницы */
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      // form.appendChild(statusMessage);
      form.insertAdjacentElement('afterend', statusMessage); /* Размещаем спиннер после текста модалки */
  
      const request = new XMLHttpRequest(); /* Создание нового XMLHttpRequest запроса */
      request.open('POST', 'server.php'); /* Настройка запроса */
      // request.setRequestHeader('Content-type', 'multypart/form-data'); /* Заголовок для FormData формата */
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      const formData = new FormData(form); /* Собирает все данные формы и формирует FormData (Особенный формат) */

      const object = {}; /* Создаем объект, чтобы заполнить его данными FormData для дальнейшей конфертации в JSON формат */
      formData.forEach(function(value, key){
        object[key] = value;
      });
      const json = JSON.stringify(object); /* Преобразуем наш объектв в JSON формат */

      request.send(json); /* Отправка запроса в JSON формате */

      request.addEventListener('load', () => { /* Обрабочки события ответа сервера */
        if (request.status === 200) {
          showThanksModal(message.success); /* Вызываем функцию для показа сообщения благодарности */
          form.reset(); /* Сброс данных формы */
          statusMessage.remove();
        } else {
          showThanksModal(message.failure); /* Вызываем функцию для показа сообщения провала */
        }
      });
    });
  }

  /* Запуск функции обработки всех форм */
  forms.forEach(item => {
    postData(item);
  });

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog'); /* Получаем контент текущего модального окна */

    prevModalDialog.classList.add('hide'); /* Скрываем контент текущего модального окна */
    openModal();

    const thanksModal = document.createElement('div'); /* Создаем div, в который будем помещать новый контент модального окна */
    thanksModal.classList.add('modal__dialog'); /* Присваиваем тот же класс, чтобы не писать новый код в стилях и формируем верстку ниже */
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;
    document.querySelector('.modal').append(thanksModal); /* Получаем модальное окно и помещаем в него динамически сформированную верстку ниже */
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }

});