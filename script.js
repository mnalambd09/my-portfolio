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
