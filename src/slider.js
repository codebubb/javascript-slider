export default class Slider {
    constructor({
        sliderSelector = '.slider',
        sliderContainerSelector = '.slider__container',
        previousSelector = '.previous',
        nextSelector = '.next',
        transitionTime = 3000,
    } = {}) {
        this.slider = document.querySelector(sliderSelector);
        this.slides = document.querySelectorAll(`${sliderContainerSelector} img`).length;
        this.sliderContainer = document.querySelector(sliderContainerSelector);
        this.previousBtn = document.querySelector(previousSelector);
        this.nextBtn = document.querySelector(nextSelector);
        this.slideSize = this.slider.offsetWidth;
        this.currentSlide = 0;
        this.setEventListeners();
        this.generateShortCuts();
        this.setAutoPlay(transitionTime);
    }

    moveSlides() {
        this.sliderContainer.style.transform = `translateX(-${this.currentSlide * this.slideSize}px)`;
        Array.from(this.shortcuts.children).forEach(shortcut => shortcut.classList.remove('active'));
        this.shortcuts.children[this.currentSlide].classList.add('active');
    };

    nextSlide() {
        this.currentSlide = this.currentSlide >= this.slides - 1 ? 0 : this.currentSlide + 1;
        this.moveSlides();
    };

    previousSlide() {
        this.currentSlide = this.currentSlide <= 0 ? this.slides - 1 : this.currentSlide - 1;
        this.moveSlides();
    };

    setEventListeners() {
        this.nextBtn.addEventListener('click', this.nextSlide.bind(this));
        this.previousBtn.addEventListener('click', this.previousSlide.bind(this));
    }

    generateShortCuts() {
        const shortcuts = document.createElement('div');
        shortcuts.classList.add('shortcuts');

        for (let i = 0; i < this.slides; i += 1) {
            const dot = document.createElement('span');
            dot.addEventListener('click', () => {
                this.currentSlide = i;
                this.moveSlides();
            });
            dot.classList.add('shortcut');
            shortcuts.appendChild(dot);
        }
        shortcuts.firstChild.classList.add('active');
        this.slider.appendChild(shortcuts);
        this.shortcuts = shortcuts;
    }

    setAutoPlay(transitionTime) {
        setInterval(this.nextSlide.bind(this), transitionTime);
    }
}