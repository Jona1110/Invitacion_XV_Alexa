document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Portada Animada (Fade In y Desaparición con Brillo) ---

    const coverOverlay = document.getElementById('cover-overlay');
    const mainContent = document.getElementById('main-content');
    const music = document.getElementById('background-music'); // Definido aquí para usarlo en la secuencia
    
    // Función para aplicar el efecto de brillo antes de desaparecer
    const applyGlowEffect = () => {
        coverOverlay.style.transition = 'opacity 0.5s ease-out, box-shadow 0.5s ease-out';
        // Brillo/Glow intenso para la transición
        coverOverlay.style.boxShadow = '0 0 100px 50px rgba(224, 247, 255, 0.8) inset'; 
        coverOverlay.style.opacity = '1';
    };

    // 1. Mostrar la portada con Fade In
    setTimeout(() => {
        coverOverlay.style.opacity = '1';
    }, 100); 

    // 2. Aplicar brillo y desaparecer después de 3 segundos
    setTimeout(() => {
        applyGlowEffect();
    }, 2500); 

    setTimeout(() => {
        coverOverlay.style.opacity = '0'; // Desvanecer
        setTimeout(() => {
            coverOverlay.style.display = 'none'; // Ocultar
            mainContent.style.display = 'block'; // Mostrar contenido principal
            
            // Iniciar la música de fondo después de mostrar el contenido
            if (music) {
                music.play().catch(error => {
                    console.log("Autoplay falló:", error);
                });
            }
            
        }, 1000); // Esperar a que el fade-out termine (1s)
    }, 3000); 

    // --- 2. Contador Regresivo ---

    const eventDate = new Date('February 21, 2026 19:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const formatTime = (time) => String(time).padStart(2, '0');

        if (document.getElementById('days')) {
            document.getElementById('days').innerText = formatTime(days);
            document.getElementById('hours').innerText = formatTime(hours);
            document.getElementById('minutes').innerText = formatTime(minutes);
            document.getElementById('seconds').innerText = formatTime(seconds);
        }

        if (distance < 0) {
            clearInterval(countdownInterval);
            if (document.getElementById('countdown-container')) {
                 document.getElementById('countdown-container').innerHTML = '<p class="cinzel-font">¡ES HOY!</p>';
            }
        }
    };

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // --- 3. Control de Música de Fondo ---

    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = musicToggle.querySelector('i');

    musicToggle.addEventListener('click', () => {
        if (music.paused) {
            music.play().catch(error => {
                alert("Para escuchar la música, por favor, permite la reproducción en tu navegador.");
            });
            musicIcon.classList.remove('fa-play');
            musicIcon.classList.add('fa-pause');
        } else {
            music.pause();
            musicIcon.classList.remove('fa-pause');
            musicIcon.classList.add('fa-play');
        }
    });
    
    // --- 4. Animación al Hacer Scroll (Reveal on Scroll) ---
    
    // Configuración para animar los elementos al entrar en el 20% del viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejar de observar una vez que se ha mostrado
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 
    });

    // Observar todos los elementos con la clase 'animated-element'
    document.querySelectorAll('.animated-element').forEach(element => {
        observer.observe(element);
    });
    
    // --- 5. Botón Volver Arriba (Scroll-to-Top) ---

    const scrollToTopBtn = document.getElementById('scroll-to-top');

    // Mostrar/Ocultar el botón
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) { 
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Funcionalidad al hacer clic
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Desplazamiento suave
        });
    });
});