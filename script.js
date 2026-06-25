const message = document.querySelector("#message");
const openButton = document.querySelector("#openMessage");
const againButton = document.querySelector("#again");
const colors = ["#ff5c9a", "#ffb3cd", "#ffd98a", "#fff7fb"];
const INTRO_DELAY_MS = 10000;
let heartTimer;
let introTimer;
let burstTimers = [];

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

function clearHeartEffects() {
  clearInterval(heartTimer);
  heartTimer = undefined;
  burstTimers.forEach((timerId) => clearTimeout(timerId));
  burstTimers = [];
  document.querySelectorAll(".heart").forEach((heart) => heart.remove());
}

function burst(amount = 36) {
  for (let i = 0; i < amount; i += 1) {
    const timerId = window.setTimeout(() => {
      makeHeart();
      burstTimers = burstTimers.filter((id) => id !== timerId);
    }, i * 38);
    burstTimers.push(timerId);
  }
}

function replayMessageAnimation() {
  message.classList.remove("show");
  void message.offsetWidth;
  message.classList.add("show");
}

function showMessage() {
  clearTimeout(introTimer);
  clearHeartEffects();
  openButton.style.display = "none";
  replayMessageAnimation();
  burst(52);
  heartTimer = setInterval(makeHeart, 240);
}

function startIntroDelay() {
  clearTimeout(introTimer);
  introTimer = window.setTimeout(showMessage, INTRO_DELAY_MS);
}

function resetToStart() {
  clearTimeout(introTimer);
  clearHeartEffects();
  message.classList.remove("show");
  openButton.style.display = "";
  startIntroDelay();
}

openButton.addEventListener("click", startIntroDelay);
againButton.addEventListener("click", resetToStart);
startIntroDelay();



