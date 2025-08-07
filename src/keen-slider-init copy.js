// Aguardar o DOM carregar completamente antes de inicializar
document.addEventListener("DOMContentLoaded", function () {
  function initializeKeenSlider() {
    const keenSliderActive = document.getElementById("keen-slider-active");
    const keenSliderCount = document.getElementById("keen-slider-count");

    // Verificar se os elementos existem antes de inicializar
    const sliderElement = document.getElementById("keen-slider");
    if (!sliderElement) {
      console.warn("Elemento #keen-slider não encontrado");
      return;
    }

    // Verificar se há slides para inicializar
    const slides = sliderElement.children;
    if (slides.length === 0) {
      console.warn("Nenhum slide encontrado no keen-slider");
      return;
    }

    const keenSlider = new KeenSlider(
      "#keen-slider",
      {
        loop: true,
        defaultAnimation: {
          duration: 750,
        },
        slides: {
          origin: "center",
          perView: 1,
          spacing: 16,
        },
        breakpoints: {
          "(min-width: 640px)": {
            slides: {
              origin: "center",
              perView: 1,
              spacing: 16,
            },
          },
          "(min-width: 768px)": {
            slides: {
              origin: "center",
              perView: 2,
              spacing: 20,
            },
          },
          "(min-width: 1024px)": {
            slides: {
              origin: "center",
              perView: 3,
              spacing: 24,
            },
          },
        },
        created(slider) {
          // First, add opacity to all slides
          slider.slides.forEach((slide) => slide.classList.add("opacity-40"));
          // Then remove it from the active slide
          slider.slides[slider.track.details.rel].classList.remove(
            "opacity-40"
          );

          if (keenSliderActive) {
            keenSliderActive.innerText = slider.track.details.rel + 1;
          }
          if (keenSliderCount) {
            keenSliderCount.innerText = slider.slides.length;
          }
        },
        slideChanged(slider) {
          // Add opacity to all slides
          slider.slides.forEach((slide) => slide.classList.add("opacity-40"));
          // Remove opacity from the active slide
          slider.slides[slider.track.details.rel].classList.remove(
            "opacity-40"
          );

          if (keenSliderActive) {
            keenSliderActive.innerText = slider.track.details.rel + 1;
          }
        },
      },
      []
    );

    const keenSliderPrevious = document.getElementById("keen-slider-previous2");
    const keenSliderNext = document.getElementById("keen-slider-next2");

    if (keenSliderPrevious) {
      keenSliderPrevious.addEventListener("click", () => keenSlider.prev());
    }

    if (keenSliderNext) {
      keenSliderNext.addEventListener("click", () => keenSlider.next());
    }
  }

  // Aguardar os depoimentos serem carregados antes de inicializar o slider
  window.addEventListener("testimonialsLoaded", initializeKeenSlider);

  // Fallback: tentar inicializar após um pequeno delay
  setTimeout(initializeKeenSlider, 500);
});
