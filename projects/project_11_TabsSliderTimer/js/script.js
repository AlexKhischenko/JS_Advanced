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