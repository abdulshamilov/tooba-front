const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
const menuBtn = document.createElement("div");
menuBtn.className = "menu-btn";
menuBtn.innerHTML = "☰";
document.querySelector(".site-header .container").prepend(menuBtn);

menuBtn.addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("active");
});
const heroTexts = [
  "Биржа волонтёров — помогай и получай признание!",
  "Каждый может изменить свой город!",
  "Объединим усилия ради добра!"
];
let heroIndex = 0;
const heroP = document.querySelector(".hero p");

if (heroP) {
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroTexts.length;
    heroP.textContent = heroTexts[heroIndex];
  }, 3000);
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".task-card, .volunteer-card, .fund-card").forEach(card => {
  observer.observe(card);
});
const themeBtn = document.createElement("button");
themeBtn.className = "theme-toggle";
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  themeBtn.innerText = "☀️";
} else {
  themeBtn.innerText = "🌙";
}

document.body.appendChild(themeBtn);

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
    themeBtn.innerText = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeBtn.innerText = "🌙";
  }
});
document.querySelectorAll(".btn-respond").forEach(btn => {
  btn.addEventListener("click", () => {
    showToast("Вы откликнулись на задачу!");
    const myTasks = document.querySelector(".my-tasks");
    if (myTasks) {
      const newTask = document.createElement("li");
      newTask.textContent = "Новая задача — ожидает выполнения ✅";
      myTasks.appendChild(newTask);
    }
  });
});
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => toast.classList.remove("show"), 2500);
  setTimeout(() => toast.remove(), 3000);
}


