// --- Carousel Logic ---
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.nav-dot');
let currentSlide = 0;
const slideInterval = 5000; // 5 seconds

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-play
let slideTimer = setInterval(nextSlide, slideInterval);

// Manual Navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideTimer); // Stop auto-play on interaction
        currentSlide = index;
        showSlide(currentSlide);
        slideTimer = setInterval(nextSlide, slideInterval); // Restart
    });
});

// --- Scroll Animation Logic ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});