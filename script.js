// Sticky Header Effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    // Change icon between bars and times
    const icon = menuToggle.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
        // If header is transparent, make icon primary color
        if (!header.classList.contains('scrolled')) {
            icon.style.color = "var(--primary-color)";
        }
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
        if (!header.classList.contains('scrolled')) {
            icon.style.color = "var(--white)";
        }
    }
});

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
        if (!header.classList.contains('scrolled')) {
            icon.style.color = "var(--white)";
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target); // Unobserve after animation plays once
        }
    });
}, observerOptions);

// Select all elements to animate
const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
animatedElements.forEach(el => observer.observe(el));

// Staggered Animations for grids/lists
const staggerContainers = [
    document.querySelector('.product-grid'),
    document.querySelector('.features-wrapper')
];

staggerContainers.forEach(container => {
    if(!container) return;
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.stagger-in');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('appear');
                    }, index * 100); // 100ms delay between each item
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    staggerObserver.observe(container);
});
