// Countdown timer functionality
function updateCountdown() {
    const countdownElements = document.querySelectorAll('.countdown-timer');
    
    countdownElements.forEach((element, index) => {
        const targetDate = new Date(element.getAttribute('data-date')).getTime();
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                clearInterval(timer);
                element.innerHTML = '<p style="color: #e74c3c; font-weight: bold;">Event Started!</p>';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const daysId = 'days';
            const hoursId = 'hours';
            const minutesId = 'minutes';
            
            const daysEl = document.getElementById(daysId);
            const hoursEl = document.getElementById(hoursId);
            const minutesEl = document.getElementById(minutesId);
            
            if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        }, 1000);
    });
}

// Smooth scrolling for navigation links
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

// Initialize countdown on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.news-card, .event-card, .group-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});
