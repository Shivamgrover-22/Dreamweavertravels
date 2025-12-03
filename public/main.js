document.addEventListener("DOMContentLoaded", function () {
    // --- 1. Preloader ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
        });
    }

    // --- 2. Navbar Toggle (Hamburger Menu) ---
    const nav = document.querySelector('nav');
    const menuBtn = document.querySelector('.menu-grid-btn');
    const menuPopup = document.querySelector('.menu-grid-popup');

    if (menuBtn && nav && menuPopup) {
        menuBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            nav.classList.toggle('show-menu-grid');
        });

        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target)) {
                nav.classList.remove('show-menu-grid');
            }
        });

        menuPopup.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('show-menu-grid');
            });
        });
    }

    // --- 3. Typewriter Effect ---
    const typeTarget = document.getElementById('services-typewriter');
    if (typeTarget) {
        const text = 'Our Services';
        let i = 0, growing = true;
        const obs = new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting) return;
            const tick = () => {
                typeTarget.textContent = text.slice(0, i) + (i % 2 === 0 ? '|' : '');
                if (growing) {
                    i++;
                    if (i > text.length) {
                        growing = false;
                        setTimeout(tick, 900);
                        return;
                    }
                } else {
                    i--;
                    if (i < 0) {
                        growing = true;
                        setTimeout(tick, 400);
                        return;
                    }
                }
                setTimeout(tick, growing ? 110 : 60);
            };
            tick();
            obs.disconnect();
        }, { threshold: 0.2 });
        obs.observe(typeTarget);
    }

    // --- 4. Testimonials Slider ---
    function initializeTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.testimonial-dots .dot');

        if (testimonials.length === 0) return;

        let current = 0;
        let autoSlideInterval;

        function showTestimonial(idx) {
            if (idx >= testimonials.length) idx = 0;
            if (idx < 0) idx = testimonials.length - 1;

            testimonials.forEach((card, i) => {
                card.classList.toggle('active', i === idx);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === idx);
            });

            current = idx;
        }

        function nextTestimonial() {
            showTestimonial(current + 1);
        }

        function startAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextTestimonial, 5000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                showTestimonial(idx);
                resetAutoSlide();
            });
        });

        showTestimonial(0);
        startAutoSlide();
    }

    if (document.querySelector('.testimonials-section')) {
        initializeTestimonialSlider();
    }

    // --- 5. "Enquire Now" Button Logic ---
    const bookNowBtn = document.getElementById('bookNowBtn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const enquiryModal = document.getElementById('enquiry-modal');
            if (enquiryModal) {
                enquiryModal.style.display = 'flex';
            }
        });
    }

    // --- 6. Contact Modal (Static) ---
    const contactModal = document.getElementById('contact-modal');
    const closeModalBtn = document.querySelector('.contact-modal-close');
    const contactForm = document.querySelector('.contact-form');
    const contactModalContent = document.querySelector('.contact-modal-content');

    if (contactModal) {
        document.querySelectorAll('a[href="contact.html"]').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                contactModal.style.display = 'flex';
            });
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                contactModal.style.display = 'none';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.style.display = 'none';
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            setTimeout(() => {
                contactModalContent.innerHTML = `<h3>Message Sent!</h3><p>Thank you for reaching out. We'll get back to you shortly.</p>`;
            }, 1500);
        });
    }

    // --- 7. Cookie Consent ---
    const cookiePopup = document.getElementById('cookie-popup');
    if (cookiePopup && !localStorage.getItem('cookieConsent')) {
        cookiePopup.style.display = 'flex';
        document.getElementById('acceptCookie').onclick = function () {
            localStorage.setItem('cookieConsent', 'accepted');
            cookiePopup.style.display = 'none';
        };
        document.getElementById('rejectCookie').onclick = function () {
            localStorage.setItem('cookieConsent', 'rejected');
            cookiePopup.style.display = 'none';
        };
    }

    // --- 8. Chatbot Logic (Static) ---
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input-field');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');
    const chatbotClearBtn = document.getElementById('chatbot-clear-btn');

    if (chatbotToggle && chatbotWindow && chatbotClose) {
        chatbotToggle.addEventListener('click', () => chatbotWindow.classList.toggle('show'));
        chatbotClose.addEventListener('click', () => chatbotWindow.classList.remove('show'));
    }

    function addMessage(text, sender) {
        if (!chatbotMessages) return;
        const div = document.createElement('div');
        div.className = `chat-message ${sender}`;
        div.innerHTML = `<span>${text}</span>`;
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function handleChat() {
        if (!chatbotInput) return;
        const text = chatbotInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatbotInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const responses = [
                "That's a great question! Please contact our support team for more details.",
                "We have amazing packages for that destination.",
                "You can check our 'Tours' page for more info.",
                "Feel free to use the enquiry form to plan your trip!"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'bot');
        }, 1000);
    }

    if (chatbotSendBtn) chatbotSendBtn.addEventListener('click', handleChat);
    if (chatbotInput) chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });

    if (chatbotClearBtn) {
        chatbotClearBtn.addEventListener('click', () => {
            if (chatbotMessages) chatbotMessages.innerHTML = '';
            addMessage("Hello! How can I help you today?", 'bot');
        });
    }

    // --- 9. Packages Tab Logic ---
    const tabs = document.querySelectorAll('.package-tab');
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const isDomestic = tab.dataset.tab === 'domestic';
            const dom = document.getElementById('domestic-packages');
            const intl = document.getElementById('international-packages');
            if (dom && intl) {
                dom.style.display = isDomestic ? 'flex' : 'none';
                intl.style.display = isDomestic ? 'none' : 'flex';
            }
        });
    });

    // --- 10. Lazy Load Images ---
    document.querySelectorAll('img').forEach(img => {
        if (!img.loading) img.loading = 'lazy';
    });

    // --- 11. Scroll Animations ---
    const revealElements = document.querySelectorAll('.destination, .package-card, .service-card, .offer-card, section h2, .hero-overlay');

    // Add reveal class initially
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 12. Enquiry Popup Logic ---
    const enquiryModal = document.getElementById('enquiry-modal');
    const closeEnquiryBtn = document.querySelector('.enquiry-modal-close');
    const enquiryFormPopup = document.getElementById('enquiryFormPopup');

    if (enquiryModal) {
        // Show popup after 2 seconds
        setTimeout(() => {
            enquiryModal.style.display = 'flex';
        }, 2000);

        if (closeEnquiryBtn) {
            closeEnquiryBtn.addEventListener('click', () => {
                enquiryModal.style.display = 'none';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === enquiryModal) {
                enquiryModal.style.display = 'none';
            }
        });
    }

    if (enquiryFormPopup) {
        enquiryFormPopup.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = enquiryFormPopup.querySelector('.submit-btn');

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            setTimeout(() => {
                const modalContent = enquiryModal.querySelector('.enquiry-modal-content');
                if (modalContent) {
                    modalContent.innerHTML = `
                        <span class="enquiry-modal-close" title="Close" onclick="document.getElementById('enquiry-modal').style.display='none'">&times;</span>
                        <div style="text-align:center; padding: 20px;">
                            <i class="fas fa-check-circle" style="font-size: 3em; color: #28a745; margin-bottom: 16px;"></i>
                            <h3 style="color: #2596be;">Enquiry Sent!</h3>
                            <p style="color: #555;">Thank you for your interest. We will get back to you shortly.</p>
                        </div>
                    `;
                }
            }, 1500);
        });
    }
});