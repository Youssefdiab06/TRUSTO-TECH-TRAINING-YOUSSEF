document.addEventListener("DOMContentLoaded", () => {
    // 1. COUNTER LOGIC
    const counters = document.querySelectorAll('.counter');
    const animationSpeed = 200; // Adjust for faster/slower counting

    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetValue = +counter.getAttribute('data-target');

                const updateCount = () => {
                    const currentCount = +counter.innerText;
                    const increment = targetValue / animationSpeed;

                    if (currentCount < targetValue) {
                        counter.innerText = Math.ceil(currentCount + increment);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = targetValue;
                    }
                };

                updateCount();
                // Stop observing once animation runs
                observer.unobserve(counter);
            }
        });
    };

    const counterObserver = new IntersectionObserver(animateCounters, {
        threshold: 0.5 // Starts when 50% of the element is visible
    });

    counters.forEach(counter => counterObserver.observe(counter));

    // 2. NAV SCROLL EFFECT (Optional: makes header shrink or change color on scroll)
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav-main');
        if (window.scrollY > 50) {
            nav.style.padding = "5px 0";
        } else {
            nav.style.padding = "10px 0";
        }
    });
});