const btn = document.getElementById("runBtn");
const message = document.getElementById("message");
const banner = document.getElementById("banner");
const title = document.getElementById("title");

let escapeCount = 0;
const maxEscape = 8;

moveButton();

// Universal handler (works for both mobile & desktop)
btn.addEventListener("pointerdown", (e) => {
  e.preventDefault();

  if (escapeCount < maxEscape) {
    moveButton();
    escapeCount++;
  } else {
    // Final success
    btn.style.display = "none";
    message.style.display = "none";
    title.style.display = "none";
    banner.style.display = "block";
  }
});

function moveButton() {
  const gameArea = document.getElementById("gameArea");

  const maxX = gameArea.clientWidth - btn.offsetWidth;
  const maxY = gameArea.clientHeight - btn.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  btn.style.left = randomX + "px";
  btn.style.top = randomY + "px";
}