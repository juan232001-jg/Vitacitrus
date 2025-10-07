// Inicializa la librería AOS (Animate On Scroll) con una duración de 1000 ms, animaciones que ocurren solo una vez y un desplazamiento de 100 px desde el fondo antes de activarse
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Escucha el evento 'load' del navegador (cuando todo el contenido está completamente cargado)
window.addEventListener('load', () => {
    // Después de 1 segundo, oculta el elemento con id 'loader' aplicando una transición de opacidad y ocultándolo visualmente
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        document.getElementById('loader').style.visibility = 'hidden';
    }, 1000);
});

// Escucha el evento de desplazamiento (scroll) en la ventana
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar'); // Obtiene el elemento del menú superior
    // Si el usuario se ha desplazado más de 100 px, reduce el padding del navbar para hacerlo más compacto
    if (window.scrollY > 100) {
        navbar.style.padding = '0.75rem 1.5rem';
    } else { 
        // Si vuelve a la parte superior, restaura el padding original
        navbar.style.padding = '1rem 1.5rem';
    }
});

// Escucha el evento 'submit' del formulario con id 'contactForm'
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.'); // Muestra un mensaje de confirmación
    e.target.reset(); // Limpia todos los campos del formulario después de enviarlo
});


// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuIcon = mobileMenuBtn.querySelector('i');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Change icon
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenuIcon.classList.remove('fa-times');
        mobileMenuIcon.classList.add('fa-bars');
    } else {
        mobileMenuIcon.classList.remove('fa-bars');
        mobileMenuIcon.classList.add('fa-times');
    }
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuIcon.classList.remove('fa-times');
        mobileMenuIcon.classList.add('fa-bars');
    });
});


