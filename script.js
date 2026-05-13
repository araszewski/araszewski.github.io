document.addEventListener("DOMContentLoaded", () => {
    
    // 1. EFEKT MASZYNY DO PISANIA (Typewriter) w sekcji Hero
    const textToType = "Cześć, tworzę media, które działają.";
    const typewriterElement = document.getElementById("typewriter-text");
    let charIndex = 0;
    const typingSpeed = 100; // Szybkość pisania w milisekundach

    function typeWriter() {
        if (charIndex < textToType.length) {
            typewriterElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Uruchomienie efektu pisania z lekkim opóźnieniem
    setTimeout(typeWriter, 500);

    // 2. ANIMACJE SCROLL REVEAL (Pojawianie się elementów przy przewijaniu)
    const reveals = document.querySelectorAll(".reveal");

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Margines widoczności zanim animacja wystartuje

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            
            // Jeśli element jest w polu widzenia, dodaj klasę .active
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    }

    // Nasłuchiwanie scrolla
    window.addEventListener("scroll", checkReveal);
    // Wywołanie na start (dla elementów już widocznych na samej górze)
    checkReveal();

    // 3. WALIDACJA FORMULARZA KONTAKTOWEGO
    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    contactForm.addEventListener("submit", function(event) {
        // Zapobiegnięcie przeładowaniu strony
        event.preventDefault();

        // Pobranie wartości z pól wejściowych
        const nameInput = document.getElementById("name").value.trim();
        const emailInput = document.getElementById("email").value.trim();
        const messageInput = document.getElementById("message").value.trim();

        // Podstawowa walidacja (czy pola nie są puste)
        if (nameInput === "" || emailInput === "" || messageInput === "") {
            formMessage.textContent = "Proszę wypełnić wszystkie pola przed wysłaniem.";
            formMessage.className = "form-message error";
            return;
        }

        // Proste sprawdzenie formatu emaila za pomocą wyrażenia regularnego
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            formMessage.textContent = "Podano niepoprawny adres email.";
            formMessage.className = "form-message error";
            return;
        }

        // Jeśli walidacja przejdzie pomyślnie
        formMessage.textContent = "Dziękuję! Twoja wiadomość została wysłana.";
        formMessage.className = "form-message success";
        
        // Wyczyszczenie formularza
        contactForm.reset();

        // Ukrycie wiadomości sukcesu po 5 sekundach
        setTimeout(() => {
            formMessage.style.display = 'none';
            // Zresetowanie klas, aby formularz był gotowy na kolejne wysłanie
            formMessage.className = "form-message";
            // Zwrócenie domyślnego display block po resecie klas (żeby błędy znów mogły się pojawić)
            setTimeout(() => formMessage.style.display = '', 50); 
        }, 5000);
    });
});