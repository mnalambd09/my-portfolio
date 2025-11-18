// ডার্ক মোড টগল
document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// GitHub প্রজেক্ট লোড
fetch('https://api.github.com/users/yourusername/repos')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('github-projects');
    data.slice(0, 5).forEach(repo => {
      const item = document.createElement('li');
      item.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
      list.appendChild(item);
    });
  });

// যোগাযোগ ফর্ম সাবমিশন
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('form-response').textContent = "আপনার বার্তা পাঠানো হয়েছে!";
});
// ব্লগ পোস্ট সাবমিশন
document.getElementById('blog-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('post-title').value.trim();
  const content = document.getElementById('post-content').value.trim();

  if (title === '' || content === '') return;

  const postDiv = document.createElement('div');
  postDiv.className = 'blog-post';

  postDiv.innerHTML = `
    <h3>${title}</h3>
    <p>${content}</p>
    <div class="comment-section">
      <input type="text" placeholder="মন্তব্য লিখুন..." class="comment-input">
      <button class="comment-button">পাঠান</button>
      <div class="comments"></div>
    </div>
  `;

  document.getElementById('blog-posts').prepend(postDiv);
  document.getElementById('blog-form').reset();
});

// কমেন্ট সাবমিশন
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('comment-button')) {
    const input = e.target.previousElementSibling;
    const commentText = input.value.trim();
    if (commentText === '') return;

    const commentDiv = document.createElement('div');
    commentDiv.textContent = `🗨️ ${commentText}`;
    e.target.nextElementSibling.appendChild(commentDiv);
    input.value = '';
  }
});

// মন্তব্য যোগ করার ফাংশন
function addComment(button) {
  const input = button.previousElementSibling;
  const commentText = input.value;
  if (commentText.trim() === '') return;

  const commentDiv = document.createElement('div');
  commentDiv.textContent = `🗨️ ${commentText}`;
  button.nextElementSibling.appendChild(commentDiv);
  input.value = '';
}
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDuXvByEr8XC63aUAy8Oo3FjmX8pg0mQt0",
  authDomain: "my-portfolio-d953a.firebaseapp.com",
  databaseURL: "https://my-portfolio-d953a-default-rtdb.firebaseio.com",
  projectId: "my-portfolio-d953a",
  storageBucket: "my-portfolio-d953a.firebasestorage.app",
  messagingSenderId: "66196906882",
  appId: "1:66196906882:web:26175ad8e3eef3bee2659b",
  measurementId: "G-HTDHQJPH32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// পোস্ট সাবমিশন
document.getElementById('blog-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('post-title').value.trim();
  const content = document.getElementById('post-content').value.trim();
  if (!title || !content) return;

  const newPostRef = db.ref('posts').push();
  newPostRef.set({
    title,
    content,
    comments: []
  });

  document.getElementById('blog-form').reset();
});

// পোস্ট লোড করা
db.ref('posts').on('value', snapshot => {
  const posts = snapshot.val();
  const container = document.getElementById('blog-posts');
  container.innerHTML = '';

  for (let id in posts) {
    const post = posts[id];
    const postDiv = document.createElement('div');
    postDiv.className = 'blog-post';
    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <div class="comment-section">
        <input type="text" placeholder="মন্তব্য লিখুন..." class="comment-input">
        <button onclick="addComment('${id}', this)">পাঠান</button>
        <div class="comments">
          ${(post.comments || []).map(c => `<div>🗨️ ${c}</div>`).join('')}
        </div>
      </div>
    `;
    container.prepend(postDiv);
  }
});

// কমেন্ট যোগ করা
function addComment(postId, button) {
  const input = button.previousElementSibling;
  const comment = input.value.trim();
  if (!comment) return;

  const commentsRef = db.ref(`posts/${postId}/comments`);
  commentsRef.once('value', snapshot => {
    const comments = snapshot.val() || [];
    comments.push(comment);
    commentsRef.set(comments);
  });

  input.value = '';
}
