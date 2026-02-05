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

function downloadAPK() {
    const btn = document.querySelector('.btn-primary');
    const originalText = btn.innerText;
    
    btn.innerText = "Iniciando download...";
    btn.disabled = true; // Evita cliques duplos

    const link = document.createElement('a');
    link.href = '/Soul-Hunter(att).apk';
    link.download = 'Soul-Hunter.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Volta o botão ao normal depois de 3 segundos
    setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
    }, 3000);
}