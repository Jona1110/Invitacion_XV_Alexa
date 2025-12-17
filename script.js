document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Portada Animada ---
    const coverOverlay = document.getElementById('cover-overlay');
    const mainContent = document.getElementById('main-content');
    const music = document.getElementById('background-music'); 
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = musicToggle.querySelector('i');
    
    const applyGlowEffect = () => {
        coverOverlay.style.transition = 'opacity 0.5s ease-out, box-shadow 0.5s ease-out';
        coverOverlay.style.boxShadow = '0 0 100px 50px rgba(224, 247, 255, 0.8) inset'; 
        coverOverlay.style.opacity = '1';
    };

    setTimeout(() => {
        coverOverlay.style.opacity = '1';
    }, 100); 

    setTimeout(() => {
        applyGlowEffect();
    }, 2500); 

    setTimeout(() => {
        coverOverlay.style.opacity = '0'; 
        setTimeout(() => {
            coverOverlay.style.display = 'none'; 
            mainContent.style.display = 'block'; 
            
            if (music) {
                music.play().catch(error => {
                    console.log("Autoplay falló:", error);
                });
            }
        }, 1000); 
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

    // --- 3. Control de Música ---
    musicToggle.addEventListener('click', () => {
        if (music.muted) {
            music.muted = false;
            musicIcon.classList.remove('fa-volume-xmark');
            musicIcon.classList.add('fa-volume-high');
        } else if (music.paused) {
            music.play();
            musicIcon.classList.remove('fa-play');
            musicIcon.classList.add('fa-volume-high');
        } 
        else {
            music.pause();
            musicIcon.classList.remove('fa-volume-high');
            musicIcon.classList.add('fa-play');
            music.muted = false;
        }
    });

    // --- 4. Animación al Hacer Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 
    });

    document.querySelectorAll('.animated-element').forEach(element => {
        observer.observe(element);
    });
    
    // --- 5. Botón Volver Arriba ---
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) { 
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });
});