/* ============================================
   SHRIONIK BRANDING AGENCY WEBSITE - MAIN JAVASCRIPT
   ============================================ */

(function () {
    'use strict';

    /* ============================================
       NAVBAR FUNCTIONALITY
       ============================================ */

    // Sticky Navbar on Scroll
    function initStickyNavbar() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        function handleScroll() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Debounce scroll event for performance
        let scrollTimeout;
        window.addEventListener('scroll', function () {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(handleScroll);
        });

        // Initial check
        handleScroll();
    }

    /* ============================================
       MOBILE MENU TOGGLE
       ============================================ */

    function initMobileMenu() {
        const toggle = document.querySelector('.navbar-toggle');
        const menu = document.querySelector('.navbar-menu');
        const menuLinks = document.querySelectorAll('.navbar-link');
        const body = document.body;

        if (!toggle || !menu) return;

        // Toggle menu
        toggle.addEventListener('click', function () {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (menu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        menuLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    /* ============================================
       SMOOTH SCROLL
       ============================================ */

    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(function (link) {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Skip if it's just "#"
                if (href === '#') {
                    e.preventDefault();
                    return;
                }

                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL hash
                    history.pushState(null, null, href);
                }
            });
        });
    }

    /* ============================================
       WHATSAPP BUTTON
       ============================================ */

    function initWhatsAppButton() {
        const whatsappBtn = document.querySelector('.whatsapp-float');

        if (!whatsappBtn) return;

        whatsappBtn.addEventListener('click', function () {
            // Replace with your actual WhatsApp number (include country code without + or -)
            const phoneNumber = '1234567890'; // REPLACE WITH YOUR NUMBER
            const message = encodeURIComponent('Hi! I\'m interested in your services.');
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

            window.open(whatsappURL, '_blank');
        });
    }

    /* ============================================
       NEWSLETTER FORM
       ============================================ */

    function initNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');

        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();

            if (!email) {
                alert('Please enter your email address');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // TODO: Send to your newsletter service
            console.log('Newsletter signup:', email);

            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }

    /* ============================================
       ACTIVE PAGE HIGHLIGHTING
       ============================================ */

    function initActivePageHighlight() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar-link');

        navLinks.forEach(function (link) {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    /* ============================================
       FADE IN ON SCROLL ANIMATION
       ============================================ */

    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe cards and sections
        const animatedElements = document.querySelectorAll('.card, .step, .pricing-card');
        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ============================================
       INITIALIZE ALL FUNCTIONS
       ============================================ */

    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                initAll();
            });
        } else {
            initAll();
        }
    }

    function initAll() {
        initStickyNavbar();
        initMobileMenu();
        initSmoothScroll();
        initWhatsAppButton();
        // initFormValidation();   // DISABLED
        // initNewsletterForm();  // DISABLED
        initActivePageHighlight();
        initScrollAnimations();
    }


    // Start initialization
    init();

})();

document.querySelector('.navbar-toggle').addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
});

const navbar = document.querySelector(".navbar");
const logo = document.querySelector(".navbar-logo");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
        logo.src = logo.dataset.colored;
    } else {
        navbar.classList.remove("scrolled");
        logo.src = "assets/images/logo-white.png";
    }
});

// Auto Update Footer Year Range
const startYear = 2025; // Your company start year
const currentYear = new Date().getFullYear();

const yearText = startYear === currentYear
    ? currentYear
    : `${startYear}–${currentYear}`;

document.getElementById("year-range").textContent = yearText;

// ===== CONTACT FORM (GOOGLE FORM SUBMISSION) =====

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formSuccess");

    if (!contactForm || !formMessage) return;

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Stop normal form submit

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const service = document.getElementById("service");
        const budget = document.getElementById("budget");
        const message = document.getElementById("message");

        if (!name || !email || !phone || !service || !budget || !message) {
            console.error("Form fields missing");
            return;
        }

        const formData = new FormData();

        // ✅ YOUR NEW FORM ENTRY IDs
        formData.append("entry.1258596235", name.value);
        formData.append("entry.1828468078", email.value);
        formData.append("entry.1888240649", phone.value);
        formData.append("entry.145772532", service.value);
        formData.append("entry.1549220321", budget.value);
        formData.append("entry.1048185499", message.value);

        const submitBtn = contactForm.querySelector("button[type='submit']");
        if (submitBtn) submitBtn.disabled = true;

        fetch(
            "https://docs.google.com/forms/d/e/1FAIpQLSe2xuc9JV1UIJBXKFolCMWsMuf6vrhbtF_uXxbbV1c1MhDJ4Q/formResponse",
            {
                method: "POST",
                mode: "no-cors",
                body: formData
            }
        );

        // Success message
        formMessage.textContent =
            "✅ Thank you! Your message has been sent successfully.";
        formMessage.style.color = "green";
        formMessage.style.display = "block";
        formMessage.style.marginTop = "15px";

        contactForm.reset();

        if (submitBtn) submitBtn.disabled = false;
    });

});
