document.addEventListener("DOMContentLoaded", function () {
  function initializeSliderProdutos() {
    const sliderElement = document.getElementById("slider-produtos");
    const sliderActive = document.getElementById("slider-produtos-active");
    const sliderCount = document.getElementById("slider-produtos-count");
    const sliderPrev = document.getElementById("slider-produtos-prev");
    const sliderNext = document.getElementById("slider-produtos-next");

    if (!sliderElement) {
      console.warn("Elemento #slider-produtos não encontrado.");
      return;
    }

    const slides = sliderElement.children;
    if (slides.length === 0) {
      console.warn("Nenhum slide encontrado dentro de #slider-produtos.");
      return;
    }

    const keenSlider = new KeenSlider("#slider-produtos", {
      loop: false,
      defaultAnimation: {
        duration: 600,
        easing: (t) => t, // pode ajustar aqui se quiser easing custom
      },
      slides: {
        origin: "center",
        perView: 1,
        spacing: 16,
      },
      created(slider) {
        if (sliderActive) {
          sliderActive.innerText = slider.track.details.rel + 1;
        }
        if (sliderCount) {
          sliderCount.innerText = slider.slides.length;
        }
      },
      slideChanged(slider) {
        if (sliderActive) {
          sliderActive.innerText = slider.track.details.rel + 1;
        }
      },
    });

    if (sliderPrev) {
      sliderPrev.addEventListener("click", () => keenSlider.prev());
    }

    if (sliderNext) {
      sliderNext.addEventListener("click", () => keenSlider.next());
    }
  }

  // Nenhum evento customizado necessário para esse
  setTimeout(initializeSliderProdutos, 300);
});
