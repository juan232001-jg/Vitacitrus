
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.toggle('hidden');
    // Actualiza aria-expanded
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // Cambia el icono (Boxicons)
    const icon = menuBtn.querySelector('i');
    if(icon) {
      icon.classList.toggle('bx-menu');
      icon.classList.toggle('bx-x'); // bx-x es el icono de "cerrar"
    }
  });

