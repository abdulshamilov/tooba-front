document.addEventListener("DOMContentLoaded", () => {
  const gamificationData = {
    points: 320,
    level: 3,
    achievements: [
      "🌱 Помощь экологии",
      "🎓 Наставник",
      "💪 Лидер команды"
    ]
  };
  const pointsEl = document.getElementById("points");
  const levelEl = document.getElementById("level");
  const achievementsEl = document.getElementById("achievements");
  pointsEl.textContent = gamificationData.points;
  levelEl.textContent = gamificationData.level;
  achievementsEl.innerHTML = "";
  gamificationData.achievements.forEach(ach => {
    const li = document.createElement("li");
    li.textContent = ach;
    achievementsEl.appendChild(li);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const data = {
    points: 320,
    pointsForNextLevel: 500,
    level: 3,
    achievements: ["🌱 Помощь экологии", "🎓 Наставник", "💪 Лидер команды"],
    activityHistory: [
      "✅ Завершена задача 'Уборка парка'",
      "✅ Проведён мастер-класс для детей",
      "✅ Помощь при организации фестиваля"
    ]
  };
  const pointsEl = document.getElementById("points");
  const pointsProgress = document.getElementById("pointsProgress");
  const pointsText = document.getElementById("pointsText");

  pointsEl.textContent = data.points;
  const progressPercent = Math.min(100, (data.points / data.pointsForNextLevel) * 100);
  pointsProgress.style.width = progressPercent + "%";
  pointsText.textContent = `До следующего уровня: ${data.pointsForNextLevel - data.points} очков`;
  const levelEl = document.getElementById("level");
  const levelText = document.getElementById("levelText");
  levelEl.textContent = data.level;
  levelText.textContent = `Вы на среднем уровне волонтёра`;
  const achievementsEl = document.getElementById("achievements");
  achievementsEl.innerHTML = "";
  data.achievements.forEach(a => {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = a;
    achievementsEl.appendChild(badge);
  });
  const activityEl = document.getElementById("activityHistory");
  activityEl.innerHTML = "";
  data.activityHistory.forEach(a => {
    const li = document.createElement("li");
    li.textContent = a;
    activityEl.appendChild(li);
  });
});
