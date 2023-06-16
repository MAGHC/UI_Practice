const $carousel = document.querySelector('.carousel'),
  firstImg = $carousel.querySelectorAll('img')[0],
  arrowIcons = document.querySelectorAll('.wrapper i');

// let firstImgWidth = firstImg.clientWidth + 14; //14는 마진

let firstImgWidth = 400;

const showHideIcons = () => {
  let scrollWidth = $carousel.scrollWidth - $carousel.clientWidth; // max 스크롤

  console.log($carousel.scrollWidth, $carousel.clientWidth, $carousel.scrollLeft);
  arrowIcons[0].style.display = $carousel.scrollLeft === 0 ? 'none' : 'block';
  arrowIcons[1].style.display = $carousel.scrollLeft > scrollWidth ? 'none' : 'block';
  //   === 로 했다가 조건식변경
};

console.log(firstImgWidth + 14);

arrowIcons.forEach((icon) => {
  icon.addEventListener('click', () => {
    $carousel.scrollLeft += icon.id === 'left' ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60);
    // 60 ms 마다.
  });
});

let isDragStart = false,
  prevPageX,
  prevScrollLeft;

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX;
  prevScrollLeft = $carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();

  //   밑에 코드 생각좀 이전 x 값 저장해서 뺴는거같은데 좀 햇갈림
  $carousel.classList.add('dragging');
  let positionDiff = e.pageX - prevPageX;
  $carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  $carousel.classList.remove('dragging');
};

$carousel.addEventListener('mousemove', dragging);
$carousel.addEventListener('mousedown', dragStart);
$carousel.addEventListener('mouseup', dragStop);
$carousel.addEventListener('mouseleave', dragStop);
// mouseleave는 마우스 드래깅상태에서 나가면 안풀리는걸 풀리게해줌, 떠나면 스탑시킨다
