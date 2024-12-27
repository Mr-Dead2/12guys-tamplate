document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("card-slider");

    // Fetch the JSON file
    fetch("plugins.json")
        .then(response => response.json())
        .then(plugins => {
            // Populate the card slider with plugin data
            plugins.forEach(plugin => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <img src="${plugin.image}" alt="${plugin.name}">
                    <a href="${plugin.documentationLink}" target="_blank">${plugin.name}</a>
                `;

                slider.appendChild(card);
            });

            // Duplicate the cards for smooth looping
            duplicateCards(slider);

            // Start automatic sliding
            initializeAutoSlide();
        })
        .catch(error => {
            console.error("Error loading plugins:", error);
        });

    function duplicateCards(slider) {
        // Duplicate cards for smooth infinite scrolling
        const cards = Array.from(slider.children);
        cards.forEach(card => {
            const clonedCard = card.cloneNode(true);
            slider.appendChild(clonedCard);
        });
    }

    function initializeAutoSlide() {
        const cards = document.querySelectorAll('.card');
        const cardWidth = cards[0].offsetWidth + 20; // Card width + margin
        const totalCards = cards.length / 2; // Half are duplicates
        let currentIndex = 0;

        setInterval(() => {
            currentIndex++;

            if (currentIndex >= totalCards) {
                // Reset position for infinite loop
                slider.style.transition = "none"; // Disable transition
                slider.style.transform = "translateX(0)"; // Jump to start
                currentIndex = 0;

                // Small delay before resuming animation
                setTimeout(() => {
                    slider.style.transition = "transform 0.5s ease-in-out"; // Restore transition
                }, 50);
            } else {
                slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            }
        }, 3000); // Slide every 3 seconds
    }
});
