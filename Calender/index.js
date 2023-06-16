const $currentDate = document.querySelector('.current-date'),
  $daysTag = document.querySelector('.days'),
  $icons = document.querySelectorAll('.icons span');

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

const renderCalender = () => {
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(), //마지막 last date
    firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(), // 첫날
    lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate(), // 지난달의 마지막날
    lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();

  let liTag = '';

  for (let i = firstDayOfMonth; i > 0; i--) {
    //이달의 첫달이 될때까지 마지막 날에서 하나씩뺴는거
    liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    //이달 채우기

    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? 'active'
        : '';
    console.log(i);
    liTag += `<li class=${isToday}>${i}</li>`;
  }

  for (let i = lastDayOfMonth; i < 6; i++) {
    // 다음달의 시작날

    liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
  }
  $currentDate.innerText = `${currYear}년 ${months[currMonth]} `;
  $daysTag.innerHTML = liTag;
};

renderCalender();

$icons.forEach((icon) => {
  icon.addEventListener('click', () => {
    currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      // 1~12월이면 전부  업데이트
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      // 아니면 date만
      data = new Date();
    }
    renderCalender();
  });
});
