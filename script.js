// Voting functionality
function vote(button) {
    // Get the vote count element
    const voteCount = button.querySelector('.vote-count');
    const currentCount = parseInt(voteCount.textContent);
    const newCount = currentCount + 1;
    
    // Update the count
    voteCount.textContent = newCount + ' votes';
    
    // Add a visual feedback
    button.style.backgroundColor = '#ffd700';
    button.style.color = '#1b4d3e';
    
    // Reset after a short delay
    setTimeout(() => {
        button.style.backgroundColor = '';
        button.style.color = '';
    }, 500);
    
    // Show a thank you message
    alert('Thanks for voting! 🎉');
}

// Confession submission
function submitConfession() {
    const confessionText = document.getElementById('confessionText').value;
    
    if (confessionText.trim() === '') {
        alert('Please write a confession first! 😊');
        return;
    }
    
    // Create a new confession card
    const confessionsFeed = document.querySelector('.confessions-feed');
    const newConfession = document.createElement('div');
    newConfession.className = 'confession-card';
    
    const now = new Date();
    const timeString = 'just now';
    
    newConfession.innerHTML = `
        <p>"${confessionText}"</p>
        <span class="confession-time">${timeString}</span>
    `;
    
    // Add to the top of the feed
    confessionsFeed.insertBefore(newConfession, confessionsFeed.firstChild);
    
    // Clear the textarea
    document.getElementById('confessionText').value = '';
    
    // Show success message
    alert('Your confession has been posted anonymously! 🤫');
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
            
            const daysId = index === 0 ? 'days' : 'days2';
            const hoursId = index === 0 ? 'hours' : 'hours2';
            const minutesId = index === 0 ? 'minutes' : 'minutes2';
            
            const daysEl = document.getElementById(daysId);
            const hoursEl = document.getElementById(hoursId);
            const minutesEl = document.getElementById(minutesId);
            
            if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        }, 1000);
    });
}

// Gallery item click functionality
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const title = this.querySelector('p').textContent;
        alert(`📸 ${title}\n\nClick to view full gallery!`);
    });
});

// Marketplace contact button
document.querySelectorAll('.marketplace .secondary-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Contact seller via WhatsApp! 💬');
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
document.querySelectorAll('.news-card, .voting-card, .event-card, .confession-card, .product-card, .gallery-item, .group-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});
