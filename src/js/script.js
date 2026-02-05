const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Função para abrir/fechar o menu
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); 
    menuToggle.classList.toggle('open');
    nav.classList.toggle('active');
});

// Fecha o menu ao clicar em qualquer lugar da tela
document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('open');
        nav.classList.remove('active');
    }
});


const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        nav.classList.remove('active');
    });
});