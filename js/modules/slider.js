function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

  let slideIndex = 1;
  let offset = 0;
  
  const slider = document.querySelector(container), 
        slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow);
  const total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter);
  const slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field);

  let widthBlockSlider = window.getComputedStyle(slidesWrapper).width;

    window.addEventListener('resize', () => {
      widthBlockSlider = window.getComputedStyle(slidesWrapper).width;
      const width = parseInt(widthBlockSlider, 10);

      offset = width * (slideIndex - 1);
      slidesField.style.transition = '';
      slidesFieldStyle();
      setTimeout(() => {
        slidesField.style.transition = '0.5s all';
      });
    })

  // slider v.2.0
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  // помещаем все слайды во внутрь slidesField
  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => { // устанавливаем для каждого слайда нужную ширину
    slide.style.width = '100%';
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol');
  const dots = [];
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;

  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);

    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);

  };

  next.addEventListener('click', () => {
    // Проверяем что это последний слайд
    if (offset == +widthBlockSlider.slice(0, widthBlockSlider.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +widthBlockSlider.slice(0, widthBlockSlider.length - 2);
    };

    slidesFieldStyle();

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    };

    addZeroToCount();
    dotsStyle();

  });

  prev.addEventListener('click', () => {
    // Проверяем что это последний слайд
    if (offset == 0) {
      offset = +widthBlockSlider.slice(0, widthBlockSlider.length - 2) * (slides.length - 1);
    } else {
      offset -= +widthBlockSlider.slice(0, widthBlockSlider.length - 2);
    };

    slidesFieldStyle();

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    };

    addZeroToCount();
    dotsStyle();

  });

  dots.forEach(dot => {
    dot.addEventListener('click', (event) => {
      const slideTo = event.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = +widthBlockSlider.slice(0, widthBlockSlider.length - 2) * (slideTo - 1);

      slidesFieldStyle();
      addZeroToCount();
      dotsStyle();

    });
  });

  function dotsStyle() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  };

  function slidesFieldStyle() {
    slidesField.style.transform = `translateX(-${offset}px)`;
  };

  function addZeroToCount() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    };
  };

  function deleteNotDidits(str) {
    return +str.replace(/\D/g, '')
  }
  
};

export default slider;


