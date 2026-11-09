
// why disaster preparedness matters section
document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".count-up");
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            const counter = entry.target;
            const target = parseFloat(counter.dataset.count);
            const decimals = parseInt(counter.dataset.decimals || "0");
            const suffix = counter.dataset.suffix || "";
            const duration = 5000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const progress = Math.min((currentTime - startTime) / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const currentValue = target * easedProgress;
                counter.textContent = currentValue.toFixed(decimals) + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toFixed(decimals) + suffix;
                }
            }

            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);
        });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
        observer.observe(counter);
    });
});

// wcwd section

const sliderContainer = document.querySelector(".slider-container");
const slideRight = document.querySelector(".right-slide");
const slideLeft = document.querySelector(".left-slide");
const upButton = document.querySelector(".up-button");
const downButton = document.querySelector(".down-button");

const originalRightSlides = Array.from(slideRight.children);
const originalLeftSlides = Array.from(slideLeft.children);

const slidesLength = originalRightSlides.length;

/* slider loop forever */
slideRight.prepend(originalRightSlides[slidesLength - 1].cloneNode(true));
slideRight.append(originalRightSlides[0].cloneNode(true));

slideLeft.prepend(originalLeftSlides[slidesLength - 1].cloneNode(true));
slideLeft.append(originalLeftSlides[0].cloneNode(true));

let activeSlideIndex = 1;
let isMoving = false;

function updateSlider(animate = true) {
    const slideHeight = sliderContainer.clientHeight;

    slideRight.style.transition = animate ? "transform 0.5s ease-in-out" : "none";
    slideLeft.style.transition = animate ? "transform 0.5s ease-in-out" : "none";

    const position = activeSlideIndex * slideHeight;

    slideRight.style.transform = `translateY(-${position}px)`;
    slideLeft.style.transform = `translateY(-${position}px)`;
}

function changeSlide(direction) {
    if (isMoving) {
        return;
    }

    isMoving = true;

    if (direction === "up") {
        activeSlideIndex++;
    } else {
        activeSlideIndex--;
    }

    updateSlider(true);
}

/*  clone -> original after the animation */
slideRight.addEventListener("transitionend", function() {
    if (activeSlideIndex === slidesLength + 1) {
        activeSlideIndex = 1;
        updateSlider(false);
    }

    if (activeSlideIndex === 0) {
        activeSlideIndex = slidesLength;
        updateSlider(false);
    }

    isMoving = false;
});

upButton.addEventListener("click", function() {
    changeSlide("up");
});

downButton.addEventListener("click", function() {
    changeSlide("down");
});

window.addEventListener("resize", function() {
    updateSlider(false);
});


window.addEventListener("load", function() {
    updateSlider(false);
});
 