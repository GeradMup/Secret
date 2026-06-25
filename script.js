const message = document.querySelector("#message");
const openButton = document.querySelector("#openMessage");
const againButton = document.querySelector("#again");
const colors = ["#ff5c9a", "#ffb3cd", "#ffd98a", "#fff7fb"];
let heartTimer;

function makeHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.18 ? "♥" : "♡";
  heart.style.setProperty("--x", `${Math.random() * 100}vw`);
  heart.style.setProperty("--size", `${18 + Math.random() * 32}px`);
  heart.style.setProperty("--duration", `${3.4 + Math.random() * 3.8}s`);
  heart.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
  document.body.appendChild(heart);
  window.setTimeout(() => heart.remove(), 7600);
}

function burst(amount = 36) {
  for (let i = 0; i < amount; i += 1) {
    window.setTimeout(makeHeart, i * 38);
  }
}

function showMessage() {
  openButton.style.display = "none";
  message.classList.remove("show");
  void message.offsetWidth;
  message.classList.add("show");
  burst(52);
  clearInterval(heartTimer);
  heartTimer = setInterval(makeHeart, 240);
}

openButton.addEventListener("click", showMessage);
againButton.addEventListener("click", () => burst(60));
window.addEventListener("load", () => window.setTimeout(showMessage, 900));
