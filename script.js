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
