const API_BASE = "http://109.172.101.232/api";
const postsContainer = document.getElementById("postsContainer");

// ============================
// Загрузка всех тем
// ============================
async function loadThreads() {
  postsContainer.innerHTML = "<p>Загрузка тем...</p>";
  try {
    const res = await axios.get(`${API_BASE}/threads/`);
    const threads = res.data;
    postsContainer.innerHTML = "";

    threads.forEach(thread => renderThread(thread));
  } catch (err) {
    postsContainer.innerHTML = "<p>Ошибка загрузки тем.</p>";
    console.error(err);
  }
}

// ============================
// Отрисовка темы
// ============================
function renderThread(thread) {
  const postDiv = document.createElement("div");
  postDiv.className = "post";
  postDiv.innerHTML = `
    <h3>${thread.title}</h3>
    <p>${thread.description || "Без описания"}</p>
    <small>Создано: ${new Date(thread.created_at).toLocaleString()}</small>
    <div class="actions">
      <button class="likeBtn">👍 0</button>
      <button class="dislikeBtn">👎 0</button>
    </div>
    <div class="discussion">
      <input type="text" placeholder="Написать комментарий...">
      <button class="addCommentBtn">Добавить</button>
    </div>
    <div class="comments"></div>
  `;
  postsContainer.prepend(postDiv);

  const likeBtn = postDiv.querySelector(".likeBtn");
  const dislikeBtn = postDiv.querySelector(".dislikeBtn");
  let likes = 0;
  let dislikes = 0;

  likeBtn.addEventListener("click", async () => {
    try {
      const res = await axios.post(`${API_BASE}/posts/${thread.id}/like/`);
      likes = res.data.likes;
      likeBtn.textContent = `👍 ${likes}`;
    } catch (err) { console.error(err); }
  });

  dislikeBtn.addEventListener("click", async () => {
    try {
      const res = await axios.post(`${API_BASE}/posts/${thread.id}/dislike/`);
      dislikes = res.data.dislikes;
      dislikeBtn.textContent = `👎 ${dislikes}`;
    } catch (err) { console.error(err); }
  });

  // добавление комментария
  const addCommentBtn = postDiv.querySelector(".addCommentBtn");
  const inputComment = postDiv.querySelector(".discussion input");
  const commentsDiv = postDiv.querySelector(".comments");

  addCommentBtn.addEventListener("click", async () => {
    const commentText = inputComment.value.trim();
    if (!commentText) return;

    try {
      const res = await axios.post(`${API_BASE}/threads/${thread.id}/posts/`, {
        author_name: "Аноним",
        content: commentText
      });

      const newComment = res.data;
      const commentDiv = document.createElement("div");
      commentDiv.textContent = `${newComment.author_name}: ${newComment.content}`;
      commentsDiv.appendChild(commentDiv);
      inputComment.value = "";
    } catch (err) {
      alert("Не удалось добавить комментарий");
      console.error(err);
    }
  });
}

// ============================
// Создание новой темы
// ============================
async function createThread() {
  const title = document.getElementById("topicTitle").value.trim();
  const description = document.getElementById("topicContent").value.trim();
  if (!title || !description) { alert("Введите название и описание."); return; }

  try {
    const res = await axios.post(`${API_BASE}/threads/`, { title, description });
    const newThread = res.data;
    renderThread(newThread);
    document.getElementById("topicTitle").value = "";
    document.getElementById("topicContent").value = "";
  } catch (err) {
    console.error(err);
    alert("Ошибка создания темы");
  }
}

// ============================
// Тоггл формы
// ============================
const toggleFormBtn = document.createElement("div");
toggleFormBtn.className = "toggle-form-btn";
toggleFormBtn.textContent = "+ Создать тему";
document.querySelector(".main-content").prepend(toggleFormBtn);

const newPostForm = document.querySelector(".new-post-form");
const addTopicBtn = document.getElementById("addTopicBtn");

toggleFormBtn.addEventListener("click", () => {
  if (newPostForm.style.display === "flex") {
    newPostForm.style.display = "none";
    toggleFormBtn.textContent = "+ Создать тему";
  } else {
    newPostForm.style.display = "flex";
    toggleFormBtn.textContent = "- Скрыть форму";
  }
});

if (addTopicBtn) addTopicBtn.addEventListener("click", createThread);

// ============================
// Старт
// ============================
loadThreads();