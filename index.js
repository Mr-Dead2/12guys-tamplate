let currentIndex = 0;
const cards = document.querySelectorAll('.card');
const totalCards = cards.length;

function nextSlide() {
    if (currentIndex < totalCards - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSliderPosition();
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalCards - 1;
    }
    updateSliderPosition();
}

function updateSliderPosition() {
    const slider = document.querySelector('.card-slider');
    const cardWidth = cards[0].offsetWidth;
    slider.style.transform = `translateX(-${cardWidth * currentIndex + 20 * currentIndex}px)`;
}

// Add automatic slide functionality (optional)
setInterval(nextSlide, 3000); // Auto slide every 3 seconds

// Optional: Add navigation buttons
document.querySelector('.next-btn').addEventListener('click', nextSlide);
document.querySelector('.prev-btn').addEventListener('click', prevSlide);
