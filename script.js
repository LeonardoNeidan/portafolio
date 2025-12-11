// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Form Validation
const contactForm = document.getElementById('contactForm');
const nombreInput = document.getElementById('nombre');
const correoInput = document.getElementById('correo');
const mensajeInput = document.getElementById('mensaje');

// Error message elements
const nombreError = document.getElementById('nombreError');
const correoError = document.getElementById('correoError');
const mensajeError = document.getElementById('mensajeError');

// Validation functions
function validateNombre() {
    const nombre = nombreInput.value.trim();
    
    if (nombre === '') {
        nombreError.textContent = 'El nombre es requerido';
        nombreInput.classList.add('error');
        return false;
    }
    
    if (nombre.length < 2) {
        nombreError.textContent = 'El nombre debe tener al menos 2 caracteres';
        nombreInput.classList.add('error');
        return false;
    }
    
    nombreError.textContent = '';
    nombreInput.classList.remove('error');
    return true;
}

function validateCorreo() {
    const correo = correoInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (correo === '') {
        correoError.textContent = 'El correo es requerido';
        correoInput.classList.add('error');
        return false;
    }
    
    if (!emailRegex.test(correo)) {
        correoError.textContent = 'Por favor ingresa un correo válido';
        correoInput.classList.add('error');
        return false;
    }
    
    correoError.textContent = '';
    correoInput.classList.remove('error');
    return true;
}

function validateMensaje() {
    const mensaje = mensajeInput.value.trim();
    
    if (mensaje === '') {
        mensajeError.textContent = 'El mensaje es requerido';
        mensajeInput.classList.add('error');
        return false;
    }
    
    if (mensaje.length < 10) {
        mensajeError.textContent = 'El mensaje debe tener al menos 10 caracteres';
        mensajeInput.classList.add('error');
        return false;
    }
    
    mensajeError.textContent = '';
    mensajeInput.classList.remove('error');
    return true;
}

// Real-time validation
nombreInput.addEventListener('blur', validateNombre);
nombreInput.addEventListener('input', () => {
    if (nombreInput.classList.contains('error')) {
        validateNombre();
    }
});

correoInput.addEventListener('blur', validateCorreo);
correoInput.addEventListener('input', () => {
    if (correoInput.classList.contains('error')) {
        validateCorreo();
    }
});

mensajeInput.addEventListener('blur', validateMensaje);
mensajeInput.addEventListener('input', () => {
    if (mensajeInput.classList.contains('error')) {
        validateMensaje();
    }
});

// Form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    const isNombreValid = validateNombre();
    const isCorreoValid = validateCorreo();
    const isMensajeValid = validateMensaje();
    
    // If all validations pass, show success message
    if (isNombreValid && isCorreoValid && isMensajeValid) {
        // Simulate form submission
        showSuccessMessage();
        
        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset();
        }, 3000);
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.form-input.error, .form-textarea.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
});

// Show success message
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('show');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
    
    // Allow clicking anywhere to close
    successMessage.addEventListener('click', () => {
        successMessage.classList.remove('show');
    });
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.about-card, .project-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax effect for gradient orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.2);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

console.log('🚀 Portfolio website loaded successfully!');
