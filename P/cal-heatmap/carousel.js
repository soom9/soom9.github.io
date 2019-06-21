var carousel = document.querySelector('.carousel');
var cells = carousel.querySelectorAll('.carousel__cell');
var cellCount;  // cellCount set from cells-range input value
var selectedIndex = 0;
var cellWidth  = carousel.offsetWidth;
var cellHeight = carousel.offsetHeight;
var isHorizontal = true;
var rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
var radius, theta;
var rotX = -8;
console.log(cellWidth, cellHeight);

function rotateCarousel() {
  var angle = theta * selectedIndex * -1;
  carousel.style.transform = 'rotateX(' + rotX + 'deg) translateZ(' +
    -radius + 'px) ' + rotateFn + '(' + angle + 'deg)';
  //console.log(carousel.style.transform);
}

var prevButton = document.querySelector('.previous-button');
prevButton.addEventListener('click', function() {
  selectedIndex--;
  rotateCarousel();
});

var nextButton = document.querySelector('.next-button');
nextButton.addEventListener('click', function() {
  selectedIndex++;
  rotateCarousel();
});

var upButton = document.querySelector('.up-button');
upButton.addEventListener('click', function() {
  rotX++;
  rotateCarousel();
})

var downButton = document.querySelector('.down-button');
downButton.addEventListener('click', function() {
  rotX--;
  rotateCarousel();
})

var cellsRange = document.querySelector('.cells-range');
cellsRange.addEventListener('change', changeCarousel);
cellsRange.addEventListener('input',  changeCarousel);

function changeCarousel() {
  cellCount = cellsRange.value;
  theta = 360 / cellCount;
  var cellSize = isHorizontal ? cellWidth : cellHeight;
  radius = Math.round((cellSize/2) / Math.tan(Math.PI/cellCount));
  for (var i=0; i < cells.length; i++) {
    var cell = cells[i];
    if (i < cellCount) {
      // visible cell
      cell.style.opacity = 1;
      var cellAngle = theta * i;
      cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
    } else {
      // hidden cell
      cell.style.opacity = 0;
      cell.style.transform = 'none';
    }
    //console.log(cell.style.transform);
  }
//      rotateCarousel();
}

var orientationRadios = document.querySelectorAll('input[name="orientation"]');
( function() {
  for (var i=0; i < orientationRadios.length; i++) {
    var radio = orientationRadios[i];
    radio.addEventListener('change', onOrientationChange);
  }
})();

function onOrientationChange() {
  var checkedRadio = document.querySelector('input[name="orientation"]:checked');
  isHorizontal = checkedRadio.value === 'horizontal';
  rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
  changeCarousel();
}

// set initials
onOrientationChange();
