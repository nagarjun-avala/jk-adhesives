
document.addEventListener('DOMContentLoaded', () => {

    console.log("Page Loaded. initializing scripts...");

    // --- 1. Mobile Menu Logic (FIXED) ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navLinksItems = document.querySelectorAll(".nav-links li a");

    // --- DEBUG CHECK ---
    // Open your browser console (F12). If you see these errors, your HTML class names are wrong.
    if (!hamburger) console.error("Error: Element with class '.hamburger' not found!");
    if (!navLinks) console.error("Error: Element with class '.nav-links' not found!");

    // --- CLICK EVENT ---
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", (e) => {
            // Prevent any weird default browser behavior
            e.preventDefault();
            e.stopPropagation();

            console.log("Hamburger clicked!"); // Check console when you click

            // Toggle the class
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");

            console.log("Classes toggled. Nav active?", navLinks.classList.contains('active'));
        });

        // Close menu when clicking a link
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            }
        });
    }

    // --- 2. Carousel Logic ---
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.nav-dot');

    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            if (slides[index]) slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        let slideTimer = setInterval(nextSlide, slideInterval);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideTimer);
                currentSlide = index;
                showSlide(currentSlide);
                slideTimer = setInterval(nextSlide, slideInterval);
            });
        });
    }

    // --- 3. Scroll Animation ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden-state');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('hidden-state');
        observer.observe(el);
    });

    // --- 4. Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });
});