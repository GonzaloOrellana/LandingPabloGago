document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Cambio de Modo Oscuro
       ========================================= */
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const header = document.getElementById('header');

    // Función para actualizar el header según el modo actual
    function updateHeaderStyles() {
        const isDark = body.classList.contains('dark-mode');
        const scrolled = window.scrollY > 50;

        if (scrolled) {
            header.style.background = isDark ? 'rgba(30, 30, 46, 0.95)' : 'rgba(232, 237, 246, 0.95)';
            header.style.boxShadow = isDark ? '0 4px 10px rgba(0,0,0,0.3)' : '0 4px 10px rgba(0,0,0,0.05)';
        } else {
            header.style.background = isDark ? 'rgba(30, 30, 46, 0.8)' : 'rgba(232, 237, 246, 0.8)';
            header.style.boxShadow = 'none';
        }
    }

    // Verificar preferencia guardada en localStorage
    const savedTheme = localStorage.getItem('theme');

    // Detectar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Aplicar tema guardado o preferencia del sistema
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    } else if (!savedTheme && prefersDark.matches) {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }

    // Actualizar header al cargar
    updateHeaderStyles();

    // Toggle al hacer click (evento de cambio de checkbox)
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            body.classList.toggle('dark-mode');

            // Actualizar header inmediatamente
            updateHeaderStyles();

            // Guardar preferencia en localStorage
            const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
    }

    // Escuchar cambios en la preferencia del sistema (solo si no hay preferencia manual)
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            body.classList.toggle('dark-mode', e.matches);
            if (darkModeToggle) darkModeToggle.checked = e.matches;
            updateHeaderStyles();
        }
    });

    // Efecto de Scroll del Header
    window.addEventListener('scroll', () => {
        updateHeaderStyles();
    });

    // Alternar Menú Móvil
    const toggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });



    // Carrusel 3D de Servicios
    const track = document.getElementById('servicesTrack');
    const cards = Array.from(document.querySelectorAll('.service-card'));
    const prevBtn = document.getElementById('prevService');
    const nextBtn = document.getElementById('nextService');
    const dotsContainer = document.getElementById('servicesDots');

    let currentIndex = 0;

    function updateCarousel() {
        cards.forEach((card, index) => {
            card.className = 'neumorphic-card service-card'; // Reiniciar

            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                card.classList.add('prev');
                card.onclick = () => { currentIndex = index; updateCarousel(); };
            } else if (index === (currentIndex + 1) % cards.length) {
                card.classList.add('next');
                card.onclick = () => { currentIndex = index; updateCarousel(); };
            } else {
                card.onclick = null;
            }
        });

        // Actualizar puntos
        dotsContainer.innerHTML = '';
        cards.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = `service-dot ${idx === currentIndex ? 'active' : ''}`;
            dot.onclick = () => { currentIndex = idx; updateCarousel(); };
            dotsContainer.appendChild(dot);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    });

    // Inicializar Servicios
    updateCarousel();

    // Lógica del Carrusel de Galería
    const gallerySlides = Array.from(document.querySelectorAll('.gallery-slide'));
    const prevGallery = document.getElementById('prevGallery');
    const nextGallery = document.getElementById('nextGallery');
    const galleryDots = document.getElementById('galleryDots');

    let galleryIndex = 0;

    function updateGallery() {
        gallerySlides.forEach((slide, index) => {
            if (index === galleryIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Actualizar Puntos
        galleryDots.innerHTML = '';
        gallerySlides.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${idx === galleryIndex ? 'active' : ''}`;
            dot.onclick = () => { galleryIndex = idx; updateGallery(); };
            galleryDots.appendChild(dot);
        });
    }

    if (prevGallery && nextGallery) {
        prevGallery.addEventListener('click', () => {
            galleryIndex = (galleryIndex - 1 + gallerySlides.length) % gallerySlides.length;
            updateGallery();
        });

        nextGallery.addEventListener('click', () => {
            galleryIndex = (galleryIndex + 1) % gallerySlides.length;
            updateGallery();
        });

        // ¿Reproducción automática opcional? Mantengamos manual por ahora según solicitud.
        updateGallery();
    }

    // Desplazamiento Suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                navLinks.classList.remove('active'); // Cerrar menú
                document.body.classList.remove('menu-open'); // Eliminar desenfoque
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* =========================================
       Enlace de Navbar Activo al Desplazarse
       ========================================= */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    const navObserverOptions = {
        threshold: 0.3 // Activar cuando el 30% de la sección es visible
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Eliminar clase active de todos
                navItems.forEach(link => {
                    link.classList.remove('active');
                    // Manejar enlace solo móvil específicamente si es necesario, pero querySelectorAll lo cure
                });

                // Agregar clase active al enlace correspondiente
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    /* =========================================
       Animaciones de Scroll y Entrada del Hero
       ========================================= */

    // Intersection Observer para Animaciones de Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Activar cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Ejecutar una vez
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Activador de Animación de Entrada del Hero
    // Los elementos con .hero-animate son manejados por animation-delay de CSS
    // Pero podemos asegurar una carga suave añadiendo una clase al body o sección si es necesario
    // Los @keyframes de CSS se ejecutarán automáticamente al cargar.

    /* =========================================
       Lógica de Cursor Personalizado
       ========================================= */
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    // Comprobar si el dispositivo soporta hover (escritorio)
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // El punto se mueve instantáneamente
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

            // Interacción con elementos clickeables
            const target = e.target;
            if (target.matches('a, button, .service-card, input, textarea')) {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = 'rgba(57, 73, 171, 0.2)';
            } else {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = 'rgba(57, 73, 171, 0.5)';
            }
        });

        // Bucle para movimiento suave del contorno
        const animateCursor = () => {
            // Interpolación Lineal (Lerp) para retraso
            // actual = actual + (objetivo - actual) * fracción
            outlineX += (mouseX - outlineX) * 0.15; // 0.15 = velocidad
            outlineY += (mouseY - outlineY) * 0.15;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();
    } else {
        // Ocultar elementos efectivamente si JS detecta táctil
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
    }

});
