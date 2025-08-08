// ESM: initialize products/services Keen Slider for mobile container
export function initKeenProducts() {
  function initialize() {
    const sliderElement = document.getElementById("slider-produtos");
    const sliderActive = document.getElementById("slider-produtos-active");
    const sliderCount = document.getElementById("slider-produtos-count");
    const sliderPrev = document.getElementById("slider-produtos-prev");
    const sliderNext = document.getElementById("slider-produtos-next");

    if (!sliderElement || !sliderElement.children.length) return;

    const slider = new KeenSlider("#slider-produtos", {
      loop: false,
      defaultAnimation: { duration: 600, easing: (t) => t },
      slides: { origin: "center", perView: 1, spacing: 16 },
      created(s) {
        if (sliderActive) sliderActive.innerText = s.track.details.rel + 1;
        if (sliderCount) sliderCount.innerText = s.slides.length;
      },
      slideChanged(s) {
        if (sliderActive) sliderActive.innerText = s.track.details.rel + 1;
      },
    });

    sliderPrev?.addEventListener("click", () => slider.prev());
    sliderNext?.addEventListener("click", () => slider.next());
  }

  // Delay slightly to ensure DOM is ready and services injected
  setTimeout(initialize, 300);
}
