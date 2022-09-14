let carousel = document.querySelector(".carousel");
let cells = carousel.querySelectorAll(".carousel__cell");
let cellCount; // cellCount set from cells-range input value
let selectedIndex = 0;
let cellWidth = carousel.offsetWidth;
let cellHeight = carousel.offsetHeight;
let isHorizontal = true;
let rotateFn = isHorizontal ? "rotateY" : "rotateX";
let radius, theta;
const gap = 40; // Space between each item
// console.log( cellWidth, cellHeight );

function rotateCarousel() {
  const angle = theta * selectedIndex * -1;
  carousel.style.transform =
    "translateZ(" + -radius + "px) " + rotateFn + "(" + angle + "deg)";
}

const prevButton = document.querySelector(".previous-button");
prevButton.addEventListener("click", function () {
  selectedIndex--;
  rotateCarousel();
});

const nextButton = document.querySelector(".next-button");
nextButton.addEventListener("click", function () {
  selectedIndex++;
  rotateCarousel();
});

const cellsRange = document.querySelector(".cells-range");
cellsRange.addEventListener("change", changeCarousel);
cellsRange.addEventListener("input", changeCarousel);

function changeCarousel() {
  cellCount = cellsRange.value;
  theta = 360 / cellCount;
  const cellSize = isHorizontal ? cellWidth : cellHeight;
  radius = Math.round(cellSize / 2 / Math.tan(Math.PI / cellCount) + gap);
  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    if (i < cellCount) {
      // visible cell
      cell.style.opacity = 1;
      let cellAngle = theta * i;
      cell.style.transform =
        rotateFn + "(" + cellAngle + "deg) translateZ(" + radius + "px)";
    } else {
      // hidden cell
      cell.style.opacity = 0;
      cell.style.transform = "none";
    }
  }

  rotateCarousel();
}
