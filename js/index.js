const today = new Date();
const todayDay = today.getDate();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();

let year = new Date().getFullYear();
let month = new Date().getMonth();
console.log(month);

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
          this.dates += `<div class="date-box prev hoilday"><div class="date">&nbsp;${this.prevDate++}</div></div>`;
        }
        else if (i === 0 && j < this.firstDay()) {
          this.dates += `<div class="date-box prev"><div class="date">&nbsp;${this.prevDate++}</div></div>`;
        }
        else if (this.dateCnt == todayDay && month == todayMonth && j === 0 && year === todayYear) {
          this.dates += `<div class="date-box this hoilday today"><div class="date">&nbsp;${this.dateCnt++}</div></div>`;
        }
        else if (this.dateCnt == todayDay && month == todayMonth && year === todayYear) {
          this.dates += `<div class="date-box this today"><div class="date">&nbsp;${this.dateCnt++}</div></div>`;
        }
        else if (this.dateCnt <= this.lastDate() && j === 0) {
          this.dates += `<div class="date-box this hoilday"><div class="date">&nbsp;${this.dateCnt++}</div></div>`;
        }
        else if (this.dateCnt <= this.lastDate()) {
          this.dates += `<div class="date-box this"><div class="date">&nbsp;${this.dateCnt++}</div></div>`;
        }
        else if (this.dateCnt > this.lastDate() && j === 0) {
          this.dates += `<div class="date-box next hoilday"><div class="date">&nbsp;${this.nextDate++}</div></div>`;
        }
        else if (this.dateCnt > this.lastDate()) {
          this.dates += `<div class="date-box next"><div class="date">&nbsp;${this.nextDate++}</div></div>`;
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
  } else if (m < 0) {
    m = 12 - Math.abs(m);
  } else {
    m = 0;
  }
  return m
}

function makeYearMonth() {
  nav.children[0].innerHTML += `<div class="year">${year}</div><div class="month">${monthName[monthCheck(month - 1)]}</div>`;
  nav.children[1].innerHTML += `<div class="year">${year}</div><div class="month">${monthName[monthCheck(month)]}</div>`;
  nav.children[2].innerHTML += `<div class="year">${year}</div><div class="month">${monthName[monthCheck(month + 1)]}</div>`;
}

function movePrevMonth() {
  console.log(month);
  const div = document.createElement('div');
  div.classList.add('year-month');
  nav.prepend(div);
  div.setAttribute('style', 'position: absolute; width: 33%; right: 100%;');
  nav.setAttribute('style', 'transition: 0.4s; transform: translateX(33%);');

  month = monthCheck(month - 1);
  if (monthCheck(month) === 0) year -= 1;

  nav.children[0].innerHTML += `<div class="year">${year}</div><div class="month">${monthName[monthCheck(month - 1)]}</div>`;
  console.log(monthCheck(month - 1));
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
  nav.append(div);

  div.setAttribute('style', 'position: absolute; width: 33%; left: 100%;');
  nav.setAttribute('style', 'transition: 0.4s; transform: translateX(-33%);');

  month = monthCheck(month + 1);
  if (monthCheck(month) === 11) year += 1;

  nav.children[3].innerHTML += `<div class="year">${year}</div><div class="month">${monthName[monthCheck(month + 1)]}</div>`;

  setTimeout(() => {
    calendar.showTable();
    div.removeAttribute('style');
    nav.removeAttribute('style');
    nav.children[0].remove();
  }, 400);
}

left.addEventListener('click', movePrevMonth);
right.addEventListener('click', moveNextMonth);


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