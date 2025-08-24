// Получаем элементы
const modal = document.getElementById("taskModal");
const modalTitle = document.getElementById("modalTitle");
const modalImg = document.getElementById("modalImg");
const modalDesc = document.getElementById("modalDesc");
const respondBtn = document.getElementById("respondBtn");
const closeBtn = document.querySelector(".modal .close");

// Создаём форму волонтёра динамически
const volunteerForm = document.createElement("form");
volunteerForm.id = "volunteerForm";
volunteerForm.style.display = "none";
volunteerForm.style.marginTop = "20px";
volunteerForm.innerHTML = `
  <label for="volName">Имя:</label>
  <input type="text" id="volName" name="volName" required />
  
  <label for="volEmail">Email:</label>
  <input type="email" id="volEmail" name="volEmail" required />
  
  <label for="volPhone">Телефон:</label>
  <input type="tel" id="volPhone" name="volPhone" required />
  
  <button type="submit" class="btn">Отправить заявку</button>
`;

// Добавляем форму в модальное окно
modal.querySelector(".modal-content").appendChild(volunteerForm);

// Открытие модального окна при клике на "Подробнее"
document.querySelectorAll(".task-card .btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".task-card");
    modalTitle.textContent = card.querySelector("h3").textContent;
    modalDesc.textContent = card.querySelector("p").textContent;
    modalImg.src = card.querySelector("img").src;
    modalImg.alt = card.querySelector("img").alt;

    // Сбрасываем видимость кнопки и формы
    respondBtn.style.display = "inline-block";
    volunteerForm.style.display = "none";

    modal.style.display = "block";
  });
});

// Закрытие модального окна
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Закрытие при клике вне окна
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Показ формы при клике на "Откликнуться"
respondBtn.addEventListener("click", () => {
  respondBtn.style.display = "none";
  volunteerForm.style.display = "block";
});

// Обработка отправки формы
volunteerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert(`Спасибо, ${document.getElementById('volName').value}, ваша заявка на "${modalTitle.textContent}" отправлена!`);
  volunteerForm.reset();
  volunteerForm.style.display = "none";
  respondBtn.style.display = "inline-block";
  modal.style.display = "none";
});
