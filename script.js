document.addEventListener('DOMContentLoaded', function () {
    // Handle Phone Input Formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        // Enforce +88 prefix
        input.addEventListener('input', function (e) {
            let value = this.value;
            if (!value.startsWith('+88')) {
                this.value = '+88' + value.replace(/^\+88/, '');
            }
            // Allow only numbers after +
            const prefix = '+88';
            const rest = this.value.substring(3).replace(/[^\d]/g, '');
            this.value = prefix + rest;
        });

        // Ensure +88 remains on focus/blur
        input.addEventListener('focus', function () {
            if (this.value === '') this.value = '+88';
        });
        input.addEventListener('blur', function () {
            if (this.value === '+88') this.value = ''; // Optional: clear if user typed nothing
            else if (!this.value.startsWith('+88')) {
                this.value = '+88' + this.value;
            }
        });
    });

    // Handle Name Input Formatting (Letters only)
    const nameInputs = document.querySelectorAll('input[name="name"]');
    nameInputs.forEach(input => {
        input.addEventListener('input', function () {
            // Remove any character that is NOT a letter (a-z, A-Z) or whitespace
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
        });
    });

    // Validation Logic
    // Clear custom validity on input for all form fields
    const formInputs = document.querySelectorAll('#contactForm input, #contactFormMobile input, #contactForm select, #contactFormMobile select');
    formInputs.forEach(input => {
        input.addEventListener('input', function () {
            this.setCustomValidity('');
        });
    });

    // Validation Logic
    function validateForm(form) {
        const nameInput = form.querySelector('input[name="name"]');
        const phoneInput = form.querySelector('input[name="phone"]');

        // Reset validity messages
        nameInput.setCustomValidity('');
        phoneInput.setCustomValidity('');

        // 1. Validate Name (Mandatory)
        if (!nameInput.value.trim()) {
            nameInput.setCustomValidity('Please Enter Your Name');
            nameInput.reportValidity();
            return false;
        }

        // 2. Validate Phone (+8801 + 9 digits)
        const phone = phoneInput.value;
        const phoneRegex = /^\+8801\d{9}$/;

        // Check if empty or just prefix
        if (!phone || phone === '+88') {
            phoneInput.setCustomValidity('Please Enter Your Valid WhatsApp Number');
            phoneInput.reportValidity();
            return false;
        }

        if (!phoneRegex.test(phone)) {
            // Using standard validation message style but with custom text if format is wrong
            phoneInput.setCustomValidity('Please Enter Your Valid WhatsApp Number');
            phoneInput.reportValidity();
            return false;
        }

        return true;
    }

    // Handle Form Submission
    const forms = ['contactForm', 'contactFormMobile'];
    forms.forEach(id => {
        const form = document.getElementById(id);
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                // Validate before submitting
                if (validateForm(this)) {
                    handleFormSubmit(this);
                }
            });
        }
    });

    // Common Form Handler
    function handleFormSubmit(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnContent = submitBtn.innerHTML;

        // Add loading state
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const country = formData.get('country');
        const degree = formData.get('degree');
        const result = formData.get('result');

        // Simulate API call / Prepare WhatsApp URL
        setTimeout(() => {
            // Remove loading state
            submitBtn.classList.remove('btn-loading');
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.disabled = false;

            // Success Animation
            form.classList.add('success-animation');

            // --- Meta Pixel: Fire CompleteRegistration ---
            if (typeof fbq !== 'undefined') {
                console.log('Pixel: Fired CompleteRegistration');
                fbq('track', 'CompleteRegistration', {
                    content_name: country,
                    currency: 'BDT',
                    value: 0 // Optional: assign value if needed
                });
            }

            // Construct WhatsApp Message
            let message = `Hi, I am interested in ${country}. My name is ${name} and phone is ${phone}.`;
            if (degree) message += ` Last Degree: ${degree}.`;
            if (result) message += ` Result: ${result}.`;

            const whatsappUrl = `https://wa.me/8801983333566?text=${encodeURIComponent(message)}`;

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');

            // Reset form
            form.reset();

            // Remove animation class after delay
            setTimeout(() => {
                form.classList.remove('success-animation');
            }, 1000);

        }, 1500);
    }

    // --- Meta Pixel Event Logic ---

    // 1. Content View (Deep Scroll - 20%)
    let hasFiredViewContent = false;
    window.addEventListener('scroll', function () {
        if (hasFiredViewContent) return;

        const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;

        // Fire when user has scrolled 20% of the page
        if (scrollPercentage > 0.20) {
            console.log('Pixel: Fired ViewContent (20% Scroll)');
            if (typeof fbq !== 'undefined') {
                fbq('track', 'ViewContent');
            }
            hasFiredViewContent = true;
        }
    });

    // 2. CompleteRegistration (On Form Success)
    // *Note: This logic is inside handleFormSubmit, but we'll add the specific tracking call here for clarity reference*
    // modify handleFormSubmit to include pixel tracking


    // Smooth scroll for anchor links (if not handled by CSS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('EduExpress Script Loaded');
});