// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add active state to nav on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightNavOnScroll() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--accent)';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// Contact form handler
function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const data = new FormData(form);
    
    // Build mailto link with form data as fallback
    const name = data.get('name');
    const email = data.get('email');
    const company = data.get('company') || 'Not specified';
    const service = data.get('service');
    const message = data.get('message');
    
    const serviceLabels = {
        'audit': 'AI Audit ($500)',
        'sprint': 'AI Sprint ($2,500-5,000)',
        'transform': 'AI Transformation ($10-25K/mo)',
        'other': 'Just Exploring'
    };
    
    const subject = `CTB Inquiry: ${serviceLabels[service]} — ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nService: ${serviceLabels[service]}\n\nMessage:\n${message}`;
    
    // Open mailto with pre-filled data
    window.location.href = `mailto:wesley@crossthebridge.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Show success message
    status.className = 'form-status success';
    status.textContent = '✅ Opening your email client... If it doesn\'t open, email wesley@crossthebridge.io directly.';
    status.style.display = 'block';
    
    // Reset form after delay
    setTimeout(() => {
        form.reset();
        status.style.display = 'none';
    }, 5000);
}

// Mobile menu toggle (simple implementation)
document.addEventListener('DOMContentLoaded', () => {
    // Add subtle fade-in animation to sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in effect
    document.querySelectorAll('.section').forEach((section, i) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
        observer.observe(section);
        // Fallback: ensure all sections visible after 1.5s regardless of scroll
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 1500 + i * 100);
    });
});
