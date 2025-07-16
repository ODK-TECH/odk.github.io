function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('nav-active');
});
