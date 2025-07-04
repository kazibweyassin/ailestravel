// ===== INITIALIZE AOS ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('navbar-scrolled');
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.classList.remove('navbar-scrolled');
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const visaType = document.getElementById('visaType').value;
    const country = document.getElementById('country').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!fullName || !email || !whatsapp || !visaType || !country) {
        showAlert('Please fill in all required fields.', 'danger');
        return;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address.', 'danger');
        return;
    }
    
    // Phone validation
    if (!isValidPhone(whatsapp)) {
        showAlert('Please enter a valid WhatsApp number.', 'danger');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
        
        // Send WhatsApp message (optional)
        sendWhatsAppMessage(fullName, email, whatsapp, visaType, country, message);
        
    }, 2000);
});

// ===== FORM VALIDATION FUNCTIONS =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.length >= 10;
}

// ===== ALERT FUNCTION =====
function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        <i class="fas fa-${type === 'danger' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert alert at the top of the form
    const formWrapper = document.querySelector('.contact-form-wrapper');
    formWrapper.insertBefore(alertDiv, contactForm);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// ===== WHATSAPP INTEGRATION =====
function sendWhatsAppMessage(name, email, phone, visaType, country, message) {
    const whatsappNumber = '256700123456'; // Replace with actual WhatsApp number
    const text = `
*New Visa Consultation Request*

👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *WhatsApp:* ${phone}
📋 *Visa Type:* ${visaType}
🌍 *Country:* ${country}
💬 *Message:* ${message || 'No additional message'}

---
Sent from Ailes Consult Website
    `.trim();
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    
    // Open WhatsApp in new tab after a short delay
    setTimeout(() => {
        if (confirm('Would you like to continue the conversation on WhatsApp?')) {
            window.open(whatsappUrl, '_blank');
        }
    }, 3000);
}

// ===== PRICING CARD INTERACTIONS =====
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (this.classList.contains('featured')) {
            this.style.transform = 'scale(1.05)';
        } else {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// ===== SERVICE CARD ANIMATIONS =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ===== TESTIMONIAL CAROUSEL (AUTO-SCROLL) =====
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    testimonials.forEach((testimonial, index) => {
        testimonial.style.opacity = '1';
        testimonial.style.transform = 'translateY(0)';
    });
}

// Initialize testimonials
if (testimonials.length > 0) {
    rotateTestimonials();
}

// ===== TYPING ANIMATION FOR HERO TITLE =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.trust-stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (counter.textContent.includes('%') ? '%' : '+');
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('%') ? '%' : '+');
            }
        }, 50);
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate counters when hero section is visible
            if (entry.target.classList.contains('hero-section')) {
                setTimeout(animateCounters, 500);
            }
            
            // Add loading animation to elements
            entry.target.classList.add('loading');
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ===== LAZY LOADING FOR IMAGES =====
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// ===== FORM FIELD ANIMATIONS =====
document.querySelectorAll('.form-control, .form-select').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
    
    // Check if field has value on page load
    if (field.value) {
        field.parentElement.classList.add('focused');
    }
});

// ===== NAVBAR MOBILE MENU CLOSE =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// ===== PACKAGE SELECTION =====
document.querySelectorAll('.pricing-card .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get package name
        const packageName = this.closest('.pricing-card').querySelector('.package-name').textContent;
        
        // Pre-fill contact form
        const messageField = document.getElementById('message');
        messageField.value = `I am interested in the ${packageName}. Please provide more information.`;
        
        // Scroll to contact form
        document.getElementById('contact').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Focus on name field
        setTimeout(() => {
            document.getElementById('fullName').focus();
        }, 1000);
    });
});

// ===== COUNTRY FLAGS ANIMATION =====
document.querySelectorAll('.country-flag').forEach(flag => {
    flag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    flag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== PRELOADER (Optional) =====
window.addEventListener('load', function() {
    // Hide preloader if exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Start animations
    document.body.classList.add('loaded');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(function() {
    // Your scroll handler code here
}, 10));

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Skip link functionality
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab' && !e.shiftKey) {
        const skipLink = document.querySelector('.skip-link');
        if (skipLink && document.activeElement === document.body) {
            skipLink.focus();
        }
    }
});

// Focus management for modals and dropdowns
document.addEventListener('shown.bs.modal', function(e) {
    const modal = e.target;
    const focusableElements = modal.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
});

// ===== INITIALIZATION =====
console.log('Ailes Consult Website Loaded Successfully! 🚀');
console.log('For support, contact: info@ailesconsult.com');
