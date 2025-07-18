// Toggle mobile nav
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('show');
});

// Dark/light mode toggle
const toggleButton = document.createElement('button');
toggleButton.className = 'theme-toggle';
toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const isDark = currentTheme === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    toggleButton.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});
