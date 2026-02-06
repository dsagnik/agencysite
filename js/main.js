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
       FORM VALIDATION & HANDLING
       ============================================ */

    function initFormValidation() {
        const forms = document.querySelectorAll('form');

        forms.forEach(function (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();

                // Clear previous errors
                const errorElements = form.querySelectorAll('.form-error');
                errorElements.forEach(function (el) {
                    el.style.display = 'none';
                });

                const errorGroups = form.querySelectorAll('.form-group.error');
                errorGroups.forEach(function (group) {
                    group.classList.remove('error');
                });

                let isValid = true;

                // Validate required fields
                const requiredFields = form.querySelectorAll('[required]');
                requiredFields.forEach(function (field) {
                    if (!field.value.trim()) {
                        showError(field, 'This field is required');
                        isValid = false;
                    }
                });

                // Validate email fields
                const emailFields = form.querySelectorAll('input[type="email"]');
                emailFields.forEach(function (field) {
                    if (field.value && !isValidEmail(field.value)) {
                        showError(field, 'Please enter a valid email address');
                        isValid = false;
                    }
                });

                // If form is valid, submit
                if (isValid) {
                    handleFormSubmit(form);
                }
            });

            // Real-time validation on blur
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(function (input) {
                input.addEventListener('blur', function () {
                    if (this.hasAttribute('required') && !this.value.trim()) {
                        showError(this, 'This field is required');
                    } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                        showError(this, 'Please enter a valid email address');
                    } else {
                        clearError(this);
                    }
                });

                // Clear error on input
                input.addEventListener('input', function () {
                    clearError(this);
                });
            });
        });
    }

    function showError(field, message) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        formGroup.classList.add('error');

        let errorElement = formGroup.querySelector('.form-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            formGroup.appendChild(errorElement);
        }

        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearError(field) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        formGroup.classList.remove('error');
        const errorElement = formGroup.querySelector('.form-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function handleFormSubmit(form) {
        // Get form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach(function (value, key) {
            data[key] = value;
        });

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        // TODO: Replace with your actual form submission endpoint
        // Example: Send to a form service like Formspree, Web3Forms, or your backend

        // Simulated submission (replace with actual API call)
        setTimeout(function () {
            // Show success message
            showFormSuccess(form);

            // Reset form
            form.reset();

            // Reset button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }

            console.log('Form submitted:', data);
        }, 1000);

        /* EXAMPLE: Actual form submission using fetch
        fetch('YOUR_FORM_ENDPOINT_HERE', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(result) {
          showFormSuccess(form);
          form.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
          }
        })
        .catch(function(error) {
          showFormError(form, 'Something went wrong. Please try again.');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
          }
        });
        */
    }

    function showFormSuccess(form) {
        // Create or show success message
        let successMsg = form.querySelector('.form-success-message');

        if (!successMsg) {
            successMsg = document.createElement('div');
            successMsg.className = 'form-success-message';
            successMsg.style.cssText = 'padding: 1rem; background: #10b981; color: white; border-radius: 8px; margin-top: 1rem; text-align: center;';
            successMsg.textContent = 'Thank you! Your message has been sent successfully.';
            form.appendChild(successMsg);
        } else {
            successMsg.style.display = 'block';
        }

        // Hide after 5 seconds
        setTimeout(function () {
            successMsg.style.display = 'none';
        }, 5000);
    }

    function showFormError(form, message) {
        let errorMsg = form.querySelector('.form-error-message');

        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'form-error-message';
            errorMsg.style.cssText = 'padding: 1rem; background: #dc2626; color: white; border-radius: 8px; margin-top: 1rem; text-align: center;';
            form.appendChild(errorMsg);
        }

        errorMsg.textContent = message;
        errorMsg.style.display = 'block';

        // Hide after 5 seconds
        setTimeout(function () {
            errorMsg.style.display = 'none';
        }, 5000);
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
        initFormValidation();
        initNewsletterForm();
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

// Contact Form
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");

    if (!form) {
        console.error("contactForm not found!");
        return;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData();

        // Map your form fields to Google Form entry IDs
        formData.append("entry.191507138", form.name.value);
        formData.append("entry.219472196", form.email.value);
        formData.append("entry.1352502707", form.phone.value);
        formData.append("entry.177055249", form.service.value);
        formData.append("entry.1362729948", form.budget.value);
        formData.append("entry.1039998442", form.message.value);

        fetch("https://docs.google.com/forms/d/e/1FAIpQLSdX-G2IF3UGObWs3XescWIT6_As8zW6SEy4jhpSHUtyc1NkDA/formResponse", {
            method: "POST",
            mode: "no-cors",
            body: formData
        });

        document.getElementById("formSuccess").innerHTML =
            "✅ Thanks! Your message sent successfully!";

        form.reset();
    });

});


