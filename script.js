document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Dark Mode Toggle
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

    // Toggle al hacer click (checkbox change event)
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

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        updateHeaderStyles();
    });

    // Mobile Menu Toggle
    const toggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Form Submission Mock
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = 'Enviando...';

        setTimeout(() => {
            alert('¡Gracias! Tu mensaje fue enviado. Te contactaremos en menos de 48 hs hábiles.');
            form.reset();
            btn.innerText = originalText;
        }, 1500);
    });

    // Services 3D Carousel
    const track = document.getElementById('servicesTrack');
    const cards = Array.from(document.querySelectorAll('.service-card'));
    const prevBtn = document.getElementById('prevService');
    const nextBtn = document.getElementById('nextService');
    const dotsContainer = document.getElementById('servicesDots');

    let currentIndex = 0;

    function updateCarousel() {
        cards.forEach((card, index) => {
            card.className = 'neumorphic-card service-card'; // Reset

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

        // Update dots
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

    // Initialize Services
    updateCarousel();

    // Gallery Carousel Logic
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

        // Update Dots
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

        // Auto play optional? Let's stick to manual for now as per request.
        updateGallery();
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                navLinks.classList.remove('active'); // Close menu
                document.body.classList.remove('menu-open'); // Remove blur
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
       Active Navbar Link on Scroll
       ========================================= */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    const navObserverOptions = {
        threshold: 0.3 // Trigger when 30% of section is visible
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all
                navItems.forEach(link => {
                    link.classList.remove('active');
                    // Handle mobile only link specifically if needed, but querySelectorAll covers it
                });

                // Add active class to corresponding link
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
       Scroll Animations & Hero Entry
       ========================================= */

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Hero Entry Animation Trigger
    // Elements with .hero-animate are handled by CSS animation-delay
    // But we can ensure smooth loading by adding a class to body or section if needed
    // The CSS @keyframes will run automatically on load.

    /* =========================================
       Custom Cursor Logic
       ========================================= */
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    // Check if device supports hover (desktop)
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot moves instantly
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

            // Interaction with clickable elements
            const target = e.target;
            if (target.matches('a, button, .service-card, input, textarea')) {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = 'rgba(57, 73, 171, 0.2)';
            } else {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = 'rgba(57, 73, 171, 0.5)';
            }
        });

        // Loop for smooth outline movement
        const animateCursor = () => {
            // Linear Interpolation (Lerp) for delay
            // current = current + (target - current) * fraction
            outlineX += (mouseX - outlineX) * 0.15; // 0.15 = speed
            outlineY += (mouseY - outlineY) * 0.15;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();
    } else {
        // Hide elements effectively if JS detects touch
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
    }

});
