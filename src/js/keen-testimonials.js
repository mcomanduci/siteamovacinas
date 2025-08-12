// ESM: initialize testimonials Keen Slider after content is injected
export function initKeenTestimonials() {
  function initialize() {
    const sliderElement = document.getElementById("keen-slider");
    if (!sliderElement || !sliderElement.children.length) return;

    const keenSliderActive = document.getElementById("keen-slider-active");
    const keenSliderCount = document.getElementById("keen-slider-count");

    const slider = new KeenSlider("#keen-slider", {
      loop: true,
      defaultAnimation: { duration: 750 },
      slides: { origin: "center", perView: 1, spacing: 16 },
      breakpoints: {
        "(min-width: 640px)": {
          slides: { origin: "center", perView: 1, spacing: 16 },
        },
        "(min-width: 768px)": {
          slides: { origin: "center", perView: 2, spacing: 20 },
        },
        "(min-width: 1024px)": {
          slides: { origin: "center", perView: 3, spacing: 24 },
        },
      },
      created(s) {
        s.slides.forEach((sl) => sl.classList.add("opacity-70"));
        s.slides[s.track.details.rel].classList.remove("opacity-70");
        if (keenSliderActive)
          keenSliderActive.innerText = s.track.details.rel + 1;
        if (keenSliderCount) keenSliderCount.innerText = s.slides.length;
      },
      slideChanged(s) {
        s.slides.forEach((sl) => sl.classList.add("opacity-70"));
        s.slides[s.track.details.rel].classList.remove("opacity-70");
        if (keenSliderActive)
          keenSliderActive.innerText = s.track.details.rel + 1;
      },
    });

    const prev = document.getElementById("keen-slider-previous");
    const next = document.getElementById("keen-slider-next");
    prev?.addEventListener("click", () => slider.prev());
    next?.addEventListener("click", () => slider.next());
  }

  window.addEventListener("testimonialsLoaded", initialize, { once: true });
  // Fallback in case event timing is missed
  setTimeout(initialize, 500);
}
