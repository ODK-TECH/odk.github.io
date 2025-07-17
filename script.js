function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('nav-active');
});

// Smooth scrolling for anchor links with header offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
        // Close hamburger menu on mobile after clicking
        document.querySelector('nav ul').classList.remove('nav-active');
    });
});
