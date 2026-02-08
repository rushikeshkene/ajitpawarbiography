document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon shape (Bars <-> Times)
            const icon = hamburger.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // --- 2. Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const images = document.querySelectorAll('.gallery-img');
    const closeBtn = document.querySelector('.close-lightbox');

    if(lightbox) {
        images.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = "block";
                lightboxImg.src = img.src;
                // Disable background scrolling
                document.body.style.overflow = "hidden";
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto";
        });

        // Close on clicking outside image
        lightbox.addEventListener('click', (e) => {
            if(e.target !== lightboxImg) {
                lightbox.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }

    // --- 3. Stats Counter Animation ---
    const statsSection = document.querySelector('#stats');
    const counters = document.querySelectorAll('.count');
    let started = false; // Flag to ensure animation runs only once

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const speed = 200; // Lower is faster
                
                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
            started = true;
        }
    });

    if(statsSection) {
        statsObserver.observe(statsSection);
    }

    // --- 4. Scroll Fade-in Animation ---
    const faders = document.querySelectorAll('.fade-in, .section');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear'); // Adds CSS class to trigger opacity 1
                entry.target.classList.add('fade-in'); // Ensure base class is present
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('apContactForm');
    const successMessage = document.getElementById('apSuccessMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Perform Basic Validation check
            if (contactForm.checkValidity()) {
                // Simulate form submission delay
                const btn = document.getElementById('apSubmitBtn');
                const btnText = btn.querySelector('.btn-text');
                btnText.textContent = "Sending...";
                btn.style.opacity = "0.7";
                btn.style.pointerEvents = "none";

                setTimeout(() => {
                    // Hide form and show success message
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    
                    // Scroll to top of the card smoothly
                    document.querySelector('.ap-contact-card').scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 1500);
            }
        });
    }
});

// Function to reset the form view
function resetContactForm() {
    const contactForm = document.getElementById('apContactForm');
    const successMessage = document.getElementById('apSuccessMessage');
    const btn = document.getElementById('apSubmitBtn');
    const btnText = btn.querySelector('.btn-text');

    contactForm.reset();
    btnText.textContent = "Send Message";
    btn.style.opacity = "1";
    btn.style.pointerEvents = "auto";
    
    successMessage.style.display = 'none';
    contactForm.style.display = 'block';
}