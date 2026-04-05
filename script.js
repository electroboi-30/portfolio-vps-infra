const btn = document.getElementById("runBtn");
const message = document.getElementById("message");
const banner = document.getElementById("banner");
const title = document.getElementById("title");

let escapeCount = 0;
const maxEscape = 8;

moveButton();

// Desktop hover
btn.addEventListener("mouseover", escape);

// Mobile touch
btn.addEventListener("touchstart", (e) => {
e.preventDefault(); // prevents instant click
escape();
});

function escape() {
if (escapeCount < maxEscape) {
moveButton();
escapeCount++;
}
}

function moveButton() {
const gameArea = document.getElementById("gameArea");

const maxX = gameArea.clientWidth - btn.offsetWidth;
const maxY = gameArea.clientHeight - btn.offsetHeight;

const randomX = Math.random() * maxX;
const randomY = Math.random() * maxY;

btn.style.left = randomX + "px";
btn.style.top = randomY + "px";
}

// Final click
btn.addEventListener("click", () => {
if (escapeCount >= maxEscape) {
btn.style.display = "none";
message.style.display = "none";
title.style.display = "none";
banner.style.display = "block";
}
});
