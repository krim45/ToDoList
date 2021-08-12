const today = new Date();
const todayDay = today.getDate();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();

let year = new Date().getFullYear();
let month = new Date().getMonth();

const nav = document.querySelector('.nav');
const left = document.querySelector('.left');
const right = document.querySelector('.right');

const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


// --------------------- Calendar ----------------------------------

class Calendar {
  constructor() {
    this.dates = "";
    this.dateCnt = 1;
    this.prevDate = new Date(year, month, 0).getDate() - this.firstDay() + 1;
    this.nextDate = new Date(year, month + 1, 1).getDate();
  }

  clear() {
    this.dates = "";
    this.dateCnt = 1;
    this.prevDate = new Date(year, month, 0).getDate() - this.firstDay() + 1;
    this.nextDate = new Date(year, month + 1, 1).getDate();
  }

  makeDates() {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < this.firstDay() && j === 0) {
          this.dates += `<div class="date-box prev hoilday"><div class="date">${this.prevDate++}</div></div>`;
        }
        else if (i === 0 && j < this.firstDay()) {
          this.dates += `<div class="date-box prev"><div class="date">${this.prevDate++}</div></div>`;
        }
        else if (this.dateCnt == todayDay && month == todayMonth && j === 0 && year === todayYear) {
          this.dates += `<div class="date-box this hoilday today"><div class="date">${this.dateCnt++}</div></div>`;
        }
        else if (this.dateCnt == todayDay && month == todayMonth && year === todayYear) {
          this.dates += `<div class="date-box this today"><div class="date">${this.dateCnt++}</div></div>`;
        }
        else if (this.dateCnt <= this.lastDate() && j === 0) {
          this.dates += `<div class="date-box this hoilday"><div class="date">${this.dateCnt++}</div></div>`;
        }
        else if (this.dateCnt <= this.lastDate()) {
          this.dates += `<div class="date-box this"><div class="date">${this.dateCnt++}</div></div>`;
        }
        else if (this.dateCnt > this.lastDate() && j === 0) {
          this.dates += `<div class="date-box next hoilday"><div class="date">${this.nextDate++}</div></div>`;
        }
        else if (this.dateCnt > this.lastDate()) {
          this.dates += `<div class="date-box next"><div class="date">${this.nextDate++}</div></div>`;
        }
      }
    }
    return this.dates
  }

  firstDay() {
    return new Date(year, month, 1).getDay()
  }

  lastDate() {
    return new Date(year, month + 1, 0).getDate()
  }

  showTable() {
    this.clear();
    const table = document.querySelector('.dates');
    table.innerHTML = "";
    table.innerHTML += this.makeDates();
  }
}

const calendar = new Calendar();
makeYearMonth();
calendar.showTable();


// ---------------------- year - month - UI ----------------------------------

function monthCheck(m) {
  if (m > 0) {
    m %= 12;
  }
  else if (m < 0) {
    m = 12 - Math.abs(m);
  }
  else {
    m = 0;
  }
  return m
}

function makeYearMonth() {
  nav.children[0].innerHTML = `<div class="year">${year}</div><div class="month">${monthName[monthCheck(month - 1)]}</div>`;
  nav.children[1].innerHTML = `<div class="year">${year}</div><div class="month">${monthName[monthCheck(month)]}</div>`;
  nav.children[2].innerHTML = `<div class="year">${year}</div><div class="month">${monthName[monthCheck(month + 1)]}</div>`;
}

function movePrevMonth() {
  const div = document.createElement('div');

  div.classList.add('year-month');
  nav.prepend(div);
  div.setAttribute('style', 'position: absolute; width: 33%; right: 100%;');
  nav.setAttribute('style', 'transition: 0.4s; transform: translateX(33%);');

  month = monthCheck(month - 1);
  if (monthCheck(month) === 0) year -= 1;

  div.innerHTML = `<div class="year">${year}</div><div class="month">${monthName[monthCheck(month - 1)]}</div>`;

  setTimeout(() => {
    calendar.showTable();
    div.removeAttribute('style');
    nav.removeAttribute('style');
    nav.children[3].remove();
  }, 400);
}

function moveNextMonth() {
  const div = document.createElement('div');

  div.classList.add('year-month');
  div.setAttribute('style', 'position: absolute; width: 33%; left: 100%;');
  nav.append(div);
  nav.setAttribute('style', 'transition: 0.4s; transform: translateX(-33%);');

  month = monthCheck(month + 1);
  if (monthCheck(month) === 11) year += 1;

  div.innerHTML = `<div class="year">${year}</div><div class="month">${monthName[monthCheck(month + 1)]}</div>`;

  setTimeout(() => {
    nav.children[0].remove();
    calendar.showTable();
    div.removeAttribute('style');
    nav.removeAttribute('style');
  }, 400);
}

left.addEventListener('click', function (event) {
  event.stopPropagation();
  movePrevMonth();
});
right.addEventListener('click', function (event) {
  event.stopPropagation();
  moveNextMonth();
});


// --------------- today-------------------------

const goToday = document.querySelector('.today-box');

function moveToday() {
  year = new Date().getFullYear();
  month = new Date().getMonth();

  nav.children[0].innerHTML = '';
  nav.children[1].innerHTML = '';
  nav.children[2].innerHTML = '';

  makeYearMonth();
  calendar.showTable();
}

goToday.addEventListener('click', moveToday);


// --------------- input delete - UI ------------------------------------

const input = document.querySelector('.to-do');
const addBtn = document.querySelector('.add');
const lists = document.querySelector('.lists');
let i = 0;

function addTodo() {
  if (input.value) {
    const div = document.createElement('div');

    div.setAttribute('class', `list${i}`);
    div.innerHTML = input.value + `<button class="deleteX${i}">x</button>`;
    lists.append(div);

    const deleteX = document.querySelector(`.deleteX${i}`);

    deleteX.addEventListener('click', function (e) {
      div.outerHTML = '';
      e.stopPropagation();
    })

    i++;
  }

  input.value = '';
}

addBtn.addEventListener('click', addTodo);