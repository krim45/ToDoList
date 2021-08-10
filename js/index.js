const today = new Date();
const todayDay = today.getDate();
const todayMonth = today.getMonth();

let year = new Date().getFullYear();
let month = new Date().getMonth();

let prevYear = year;
let prevMonth = month;
let nextYear = year;
let nextMonth = month + 2;

const prevMonthHtml = document.querySelector('.prev-month');
const yearMonthHtml = document.querySelector('.year-month');
const nextMonthHtml = document.querySelector('.next-month');


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
          this.dates += `<div class="date prev hoilday">&nbsp;${this.prevDate++}</div>`;
        }
        else if (i === 0 && j < this.firstDay()) {
          this.dates += `<div class="date prev">&nbsp;${this.prevDate++}</div>`;
        }
        else if (this.dateCnt == todayDay && month == todayMonth) {
          this.dates += `<div class="date this today">&nbsp;${this.dateCnt++}</div>`;
        }
        else if (this.dateCnt <= this.lastDate() && j === 0) {
          this.dates += `<div class="date this hoilday">&nbsp;${this.dateCnt++}</div>`;
        }
        else if (this.dateCnt <= this.lastDate()) {
          this.dates += `<div class="date this">&nbsp;${this.dateCnt++}</div>`;
        }
        else if (this.dateCnt > this.lastDate() && j === 0) {
          this.dates += `<div class="date next hoilday">&nbsp;${this.nextDate++}</div>`;
        }
        else if (this.dateCnt > this.lastDate()) {
          this.dates += `<div class="date next">&nbsp;${this.nextDate++}</div>`;
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

function makeYearMonth() {
  removeHtml();
  prevYear = year;
  prevMonth = month;
  nextYear = year;
  nextMonth = month + 2;

  if (month === 0) {
    prevMonth = 12 + prevMonth;
    prevYear -= 1;
  }
  else if (month < 0) {
    year -= 1;
    month = 12 + month;
    prevMonth = 12 + prevMonth;
    prevYear = year;
  }
  else if (month === 11) {
    nextYear += 1;
    nextMonth -= 12;
  }
  else if (month > 11) {
    year += 1;
    month -= 12;
    nextMonth -= 12;
    nextYear = year;
  }

  prevMonthHtml.innerHTML += `<div class="year">${prevYear}</div>`;
  prevMonthHtml.innerHTML += `<div class="month">${prevMonth}</div>`;

  yearMonthHtml.innerHTML += `<div class="year">${year}</div>`;
  yearMonthHtml.innerHTML += `<div class="month">${month + 1}</div>`;

  nextMonthHtml.innerHTML += `<div class="year">${nextYear}</div>`;
  nextMonthHtml.innerHTML += `<div class="month">${nextMonth}</div>`;
}

function removeHtml() {
  prevMonthHtml.innerHTML = '';
  yearMonthHtml.innerHTML = '';
  nextMonthHtml.innerHTML = '';
}

function movePrevMonth() {
  month -= 1;
  console.log('prev');
  makeYearMonth();
  calendar.showTable();
}

function moveNextMonth() {
  month += 1;
  console.log('next');
  makeYearMonth();
  calendar.showTable();
}


prevMonthHtml.addEventListener('click', movePrevMonth);
nextMonthHtml.addEventListener('click', moveNextMonth);



// --------------- today-------------------------

const goToday = document.querySelector('.today-box');

goToday.addEventListener('click', moveToday);


function moveToday() {
  year = new Date().getFullYear();
  month = new Date().getMonth();
  makeYearMonth();
  calendar.showTable();
}

