// Inicializa la librería AOS (Animate On Scroll)
AOS.init({
    duration: 1000, // Define que cada animación durará 1000 milisegundos (1 segundo)
    once: true,     // Indica que las animaciones solo se ejecutarán una vez
    offset: 100     // Activa la animación cuando el elemento esté a 100px del borde inferior
});

// Escucha el evento 'load' del navegador (cuando todo el contenido se ha cargado)
window.addEventListener('load', () => {
    // Ejecuta el siguiente bloque después de 1 segundo
    setTimeout(() => {
        // Selecciona el elemento con id 'loader' y cambia su opacidad a 0 para crear un efecto de desvanecimiento
        document.getElementById('loader').style.opacity = '0';
        // Cambia la visibilidad del loader a 'hidden' para ocultarlo visualmente
        document.getElementById('loader').style.visibility = 'hidden';
    }, 1000); // Tiempo de espera de 1000 ms (1 segundo)
});

// Escucha el evento de desplazamiento (scroll) en la ventana
window.addEventListener('scroll', () => {
    // Obtiene el elemento del menú superior mediante su id 'navbar'
    const navbar = document.getElementById('navbar');
    // Verifica si el usuario se ha desplazado más de 100 píxeles
    if (window.scrollY > 100) {
        // Si se ha desplazado más de 100 px, reduce el padding del navbar
        navbar.style.padding = '0.75rem 1.5rem';
    } else { 
        // Si el usuario vuelve a la parte superior, restaura el padding original
        navbar.style.padding = '1rem 1.5rem';
    }
});

// Escucha el evento 'submit' del formulario con id 'contactForm'
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página al enviarse
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.'); // Muestra un mensaje de confirmación
    e.target.reset(); // Limpia todos los campos del formulario después del envío
});

// Obtiene el botón del menú móvil por su id 'mobileMenuBtn'
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
// Obtiene el contenedor del menú móvil
const mobileMenu = document.getElementById('mobileMenu');
// Obtiene el ícono dentro del botón del menú móvil
const mobileMenuIcon = mobileMenuBtn.querySelector('i');

// Agrega un evento de clic al botón del menú móvil
mobileMenuBtn.addEventListener('click', () => {
    // Alterna la clase 'hidden' para mostrar u ocultar el menú móvil
    mobileMenu.classList.toggle('hidden');
    
    // Verifica si el menú móvil está oculto
    if (mobileMenu.classList.contains('hidden')) {
        // Si está oculto, cambia el ícono de "X" (fa-times) a "barras" (fa-bars)
        mobileMenuIcon.classList.remove('fa-times');
        mobileMenuIcon.classList.add('fa-bars');
    } else {
        // Si el menú está visible, cambia el ícono de "barras" (fa-bars) a "X" (fa-times)
        mobileMenuIcon.classList.remove('fa-bars');
        mobileMenuIcon.classList.add('fa-times');
    }
});

// Selecciona todos los enlaces dentro del menú móvil
const mobileLinks = mobileMenu.querySelectorAll('a');
// Recorre cada enlace del menú móvil
mobileLinks.forEach(link => {
    // Agrega un evento de clic a cada enlace
    link.addEventListener('click', () => {
        // Oculta nuevamente el menú al hacer clic en un enlace
        mobileMenu.classList.add('hidden');
        // Cambia el ícono de "X" (fa-times) a "barras" (fa-bars)
        mobileMenuIcon.classList.remove('fa-times');
        mobileMenuIcon.classList.add('fa-bars');
    });
});


    document.addEventListener('DOMContentLoaded', function() {
        const video = document.getElementById('videoFondo');
        
        // Intentar reproducir el video
        video.play().catch(function(error) {
            console.log("Error al reproducir video:", error);
        });
        
        // Verificar si el video carga correctamente
        video.addEventListener('loadeddata', function() {
            console.log("Video cargado correctamente");
        });
        
        video.addEventListener('error', function(e) {
            console.log("Error al cargar video:", e);
        });
    });
