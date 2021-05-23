function slider() {
    // SLIDER 

	const slider = document.querySelector('.offer__slider'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    width = window.getComputedStyle(slidesWrapper).width; 

    slider.style.position = 'relative';
    slidesWrapper.style.overflow = 'hidden';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesField.style.width = 100 * slides.length + '%';
    slides.forEach(slide => slide.style.width = width);

    let slideIndex = 1,
    offset = 0;

    if (slides.length < 10)	{
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
    } else {
    total.textContent = slides.length;
    current.textContent = `${slideIndex}`;
    }
    
    function changeSlide() {
    slidesField.style.transform = `translateX(-${offset}px)`;
    
    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
    
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
    }

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);


    for (let i =0; i < slides.length; i++) {
    let dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if (i == 0){
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
    }

    function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += deleteNotDigits(width);
    }	
    
    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }
    
    changeSlide();
    }); 

    prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
        offset -= deleteNotDigits(width);
    }
    
    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }
    
    changeSlide();
    }); 

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            let offset = deleteNotDigits(width) * (slides.length - 1);
            changeSlide();
        });
    });
}
module.exports = slider;