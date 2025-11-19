document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Portada Animada (Fade In y Desaparición con Brillo) ---

    const coverOverlay = document.getElementById('cover-overlay');
    const mainContent = document.getElementById('main-content');
    const music = document.getElementById('background-music'); 
    
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
    
    // --- 4. Lógica de Generación de Boletos y PDF (ESTRUCTURA CORREGIDA) ---
    
    const rsvpForm = document.getElementById('rsvp-form');
    const namesInput = document.getElementById('names');
    const ticketDisplay = document.getElementById('ticket-display');
    const ticketsContainer = document.getElementById('tickets-container');
    const printButton = document.getElementById('print-tickets-button');
    
    const generateUniqueId = (name) => {
        const initial = name.trim().toUpperCase().charAt(0);
        const timestamp = Date.now().toString().slice(-4);
        const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `DA-${initial}${timestamp}-${randomString}`;
    };

    const generateTicketHtml = (name) => {
        const id = generateUniqueId(name);
        
        // **Estructura Horizontal con detalles corregidos: Templo 7 PM, Salón 9 PM**
        return `
            <div class="magic-ticket">
                <div class="ticket-info-section">
                    <p class="elegant-text ticket-header">PASE PARA EL GRAN BAILE</p>
                    <p class="cinzel-font ticket-name">${name.toUpperCase()}</p>
                    
                    <div class="ticket-details-grid">
                        <div class="detail-item">
                            <p class="detail-label">FECHA</p>
                            <p class="detail-value">SÁBADO 21 FEB</p>
                        </div>
                        <div class="detail-item">
                            <p class="detail-label">TEMPLO: MADRE ADMIRABLE</p>
                            <p class="detail-value">7:00 PM</p>
                        </div>
                        <div class="detail-item">
                            <p class="detail-label">SALÓN: AURA LOUNGE</p>
                            <p class="detail-value">9:00 PM</p>
                        </div>
                        <div class="detail-item">
                            <p class="detail-label">EVENTO</p>
                            <p class="detail-value">XV AÑOS</p>
                        </div>
                    </div>
                </div>

                <div class="ticket-access-section">
                    <div class="ticket-perforation"></div> 
                    <i class="fas fa-crown access-icon"></i>
                    <p class="cinzel-font access-code-label">CÓDIGO REAL:</p>
                    <p class="cinzel-font access-code-value">${id}</p>
                    <p class="elegant-text access-footer">Presenta este pase al ingreso.</p>
                </div>
            </div>
        `;
    };

    // Función simple para activar la impresión (exportar a PDF)
    const handlePrintAllTickets = () => {
        window.print();
    };
    
    if (printButton) {
        printButton.addEventListener('click', handlePrintAllTickets);
    }

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const rawNames = namesInput.value;
        if (!rawNames.trim()) {
            alert('Por favor, ingresa al menos un nombre.');
            return;
        }

        const namesArray = rawNames
            .split(',')
            .map(name => name.trim())
            .filter(name => name.length > 0); 

        if (namesArray.length === 0) {
            alert('Por favor, ingresa nombres válidos.');
            return;
        }

        let ticketsHtml = namesArray.map(name => generateTicketHtml(name)).join('');

        ticketsContainer.innerHTML = ticketsHtml;
        ticketDisplay.style.display = 'block';
        
        ticketDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        rsvpForm.querySelector('button').disabled = true;
        rsvpForm.querySelector('button').innerText = 'Boletos Generados';
    });


    // --- 5. Animación al Hacer Scroll (Reveal on Scroll) ---
    
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
    
    // --- 6. Botón Volver Arriba (Scroll-to-Top) ---

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