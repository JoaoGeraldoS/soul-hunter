const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Função para abrir/fechar o menu
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Impede que o clique no botão se espalhe para o resto da tela
    menuToggle.classList.toggle('open');
    nav.classList.toggle('active');
});

// Fecha o menu ao clicar em qualquer lugar da tela
document.addEventListener('click', (e) => {
    // Verifica se o menu está aberto E se o clique NÃO foi dentro do nav ou do botão
    if (nav.classList.contains('active') && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('open');
        nav.classList.remove('active');
    }
});

// Opcional: Fecha o menu ao clicar em um link (bom para sites de uma página só)
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        nav.classList.remove('active');
    });
});