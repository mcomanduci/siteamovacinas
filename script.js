// --- DATA ---
const servicesData = [
  {
    icon: "home",
    title: "Vacinação Domiciliar",
    description:
      "Leve a proteção até você. Realizamos a aplicação de vacinas em casa, na maternidade, em escolas e empresas.",
  },
  {
    icon: "gem",
    title: "Furo de Orelhinha",
    description:
      "Sistema humanizado, silencioso e com brincos antialérgicos folheados a ouro 24k. Ideal para bebês.",
  },
  {
    icon: "thermometer-snowflake",
    title: "Compressa Mágica",
    description:
      "Compressa em gel para alívio da febre, dores de cabeça e dor local pós-vacina. Frescor imediato por até 8h.",
  },
  {
    icon: "heart-pulse",
    title: "Picadinha Mágica",
    description:
      "Dispositivo que sensibiliza os nervos da região e diminui a sensação de dor causada pela agulha.",
  },
  {
    icon: "droplets",
    title: "Lavagem Nasal",
    description:
      "Dispositivo seguro e de fácil uso com adaptadores anatômicos para alívio imediato da congestão nasal.",
  },
  {
    icon: "stethoscope",
    title: "Outros Cuidados",
    description:
      "Oferecemos também aferição de pressão, aplicação de medicação e medição de glicemia capilar.",
  },
];

const testimonialsData = [
  {
    img: "https://placehold.co/50x50/ec4899/FFFFFF?text=M",
    name: "Mariana L.",
    role: "Mãe do João",
    text: '"O atendimento em casa foi um divisor de águas! Vacinar meu bebê no conforto do nosso lar, sem estresse, não tem preço. A enfermeira foi um anjo!"',
  },
  {
    img: "https://placehold.co/50x50/ec4899/FFFFFF?text=A",
    name: "Ana P.",
    role: "Mãe do Lucas",
    text: "\"Usei a 'Picadinha Mágica' na vacina do meu filho de 5 anos e foi incrível. Ele nem percebeu a agulha! Recomendo a todas as mães.\"",
  },
  {
    img: "https://placehold.co/50x50/ec4899/FFFFFF?text=C",
    name: "Carla M.",
    role: "Filha",
    text: '"Contratei o plano para meus pais idosos. A organização e o cuidado da Amo Vacinas em garantir que eles recebam as vacinas anuais me deixa muito mais tranquila."',
  },
  {
    img: "https://placehold.co/50x50/ec4899/FFFFFF?text=R",
    name: "Roberto S.",
    role: "Pai da Sofia",
    text: '"A equipe é extremamente profissional e carinhosa. Minha filha ficou super calma durante toda a vacinação. Parabéns pelo excelente trabalho!"',
  },
  {
    img: "https://placehold.co/50x50/ec4899/FFFFFF?text=J",
    name: "Juliana F.",
    role: "Mãe da Beatriz",
    text: '"Serviço impecável! A compressa mágica realmente funciona e a equipe sempre muito atenciosa. Recomendo de olhos fechados!"',
  },
  {
    img: "https://placehold.co/50x50/ec4899/FFFFFF?text=P",
    name: "Paulo T.",
    role: "Avô do Miguel",
    text: '"Como idoso, me sinto muito seguro com o acompanhamento da Amo Vacinas. Nunca mais me preocupo em esquecer uma vacina importante."',
  },
];

// --- RENDER FUNCTIONS ---
function createServiceCard(service) {
  return `
    <div class="keen-slider__slide bg-purple-50 p-8 rounded-2xl text-left flex flex-col">
      <div class="bg-pink-500 text-white w-14 h-14 rounded-xl flex items-center justify-center mb-4">
        <i data-lucide="${service.icon}" class="w-8 h-8"></i>
      </div>
      <h3 class="text-xl font-bold text-purple-800 mb-2">${service.title}</h3>
      <p class="text-gray-600 flex-grow">${service.description}</p>
    </div>
  `;
}

function createTestimonialCard(testimonial) {
  return `
    <div class="keen-slider__slide bg-purple-50 p-8 rounded-2xl relative flex-col shadow-lg">
      <i data-lucide="quote" class="absolute top-4 right-4 h-12 w-12 text-purple-200 opacity-50"></i>
      <p class="text-gray-600 mb-6 flex-grow leading-relaxed">${testimonial.text}</p>
      <div class="flex items-center">
        <img src="${testimonial.img}" class="w-12 h-12 rounded-full mr-4" alt="Foto de ${testimonial.name}">
        <div>
          <p class="font-bold text-purple-800">${testimonial.name}</p>
          <p class="text-sm text-gray-500">${testimonial.role}</p>
        </div>
      </div>
    </div>
  `;
}

// --- CAROUSEL SETUP (for services only) ---
function setupCarousel(
  containerId,
  sliderId,
  indicatorsId,
  data,
  cardCreator,
  itemsPerSlide = 1
) {
  const slider = document.getElementById(sliderId);
  const indicatorsContainer = document.getElementById(indicatorsId);
  if (!slider || !indicatorsContainer) return;

  let totalSlides = Math.ceil(data.length / itemsPerSlide);
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  slider.innerHTML = "";
  indicatorsContainer.innerHTML = "";

  for (let i = 0; i < totalSlides; i++) {
    const slideEl = document.createElement("div");
    slideEl.className = "w-full flex-shrink-0 flex gap-4 px-2";
    const startIndex = i * itemsPerSlide;
    const endIndex = startIndex + itemsPerSlide;

    slideEl.innerHTML = data
      .slice(startIndex, endIndex)
      .map(cardCreator)
      .join("");

    slider.appendChild(slideEl);

    const indicator = document.createElement("button");
    indicator.className = `w-2.5 h-2.5 rounded-full transition-colors ${
      i === 0 ? "bg-purple-500" : "bg-purple-200"
    }`;
    indicator.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
    });
    indicatorsContainer.appendChild(indicator);
  }

  function updateCarousel() {
    slider.style.transition =
      "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    const indicators = indicatorsContainer.querySelectorAll("button");
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("bg-purple-500", index === currentIndex);
      indicator.classList.toggle("bg-purple-200", index !== currentIndex);
    });
  }

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      currentIndex = Math.min(currentIndex + 1, totalSlides - 1);
      updateCarousel();
    }
    if (touchEndX > touchStartX + 50) {
      currentIndex = Math.max(currentIndex - 1, 0);
      updateCarousel();
    }
  }

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  return {
    next: () => {
      currentIndex = Math.min(currentIndex + 1, totalSlides - 1);
      updateCarousel();
    },
    prev: () => {
      currentIndex = Math.max(currentIndex - 1, 0);
      updateCarousel();
    },
    getCurrentIndex: () => currentIndex,
    getTotalSlides: () => totalSlides,
  };
}

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  // Lucide Icons
  lucide.createIcons();

  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Clinic Carousel
  const clinicCarousel = document.getElementById("clinic-carousel");
  if (clinicCarousel) {
    const items = clinicCarousel.querySelectorAll(".carousel-item");
    const prevBtn = clinicCarousel.querySelector("#prevBtn");
    const nextBtn = clinicCarousel.querySelector("#nextBtn");
    let currentIndex = 0;
    let autoPlayInterval;

    function showSlide(index) {
      items.forEach((item, i) => {
        item.style.opacity = i === index ? "1" : "0";
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % items.length;
      showSlide(currentIndex);
    }

    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 5000);
    }
    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    nextBtn.addEventListener("click", () => {
      nextSlide();
      stopAutoPlay();
      startAutoPlay();
    });
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showSlide(currentIndex);
      stopAutoPlay();
      startAutoPlay();
    });

    showSlide(currentIndex);
    startAutoPlay();
  }

  // Tabs for Vacinas Section
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("tab-active"));
      tabContents.forEach((content) => content.classList.add("hidden"));
      button.classList.add("tab-active");
      document.getElementById(button.dataset.tab).classList.remove("hidden");
    });
  });
  tabButtons.forEach((button) => {
    if (!button.classList.contains("tab-active")) {
      button.classList.add(
        "bg-white",
        "text-purple-600",
        "py-2",
        "px-4",
        "rounded-full",
        "font-semibold",
        "border",
        "border-purple-200",
        "hover:bg-purple-100",
        "transition-colors"
      );
    } else {
      button.classList.add(
        "py-2",
        "px-4",
        "rounded-full",
        "font-semibold",
        "border",
        "transition-colors"
      );
    }
  });

  // Populate and setup Services
  const servicosGrid = document.getElementById("servicos-grid");
  if (servicosGrid) {
    servicosGrid.innerHTML = servicesData.map(createServiceCard).join("");
    setupCarousel(
      "servicos-carousel",
      "servicos-slider",
      "servicos-indicators",
      servicesData,
      createServiceCard
    );
  }

  const servicosCarou = document.getElementById("slider-produtos");
  if (servicosCarou) {
    servicosCarou.innerHTML = servicesData.map(createServiceCard).join("");
    setupCarousel(
      "servicos-carousel",
      "servicos-slider",
      "servicos-indicators",
      servicesData,
      createServiceCard
    );
  }

  // Populate Testimonials Grid
  setupTestimonials();

  // Função simples para adicionar depoimentos ao grid
  function setupTestimonials() {
    const grid = document.getElementById("keen-slider");
    if (!grid) return;

    // Adicionar todos os cards de depoimentos ao grid
    grid.innerHTML = testimonialsData.map(createTestimonialCard).join("");

    // Emitir evento customizado para indicar que os depoimentos foram carregados
    window.dispatchEvent(new CustomEvent("testimonialsLoaded"));
  }

  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item, index) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");
    const icon = item.querySelector(".accordion-icon");

    // Abre o primeiro item (Criança) por padrão
    if (index === 0) {
      item.classList.add("accordion-item-active");
      content.style.maxHeight = content.scrollHeight + "px";
      icon.style.transform = "rotate(180deg)";
    }

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("accordion-item-active");

      // Fecha todos os itens
      accordionItems.forEach((i) => {
        i.classList.remove("accordion-item-active");
        i.querySelector(".accordion-content").style.maxHeight = 0;
        i.querySelector(".accordion-icon").style.transform = "rotate(0deg)";
      });

      // Se o item clicado não estava ativo, abre ele
      if (!isActive) {
        item.classList.add("accordion-item-active");
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = "rotate(180deg)";
      }
    });
  });

  // modal
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalPrevBtn = document.getElementById("modalPrevBtn");
  const modalNextBtn = document.getElementById("modalNextBtn");

  const carouselImages = Array.from(
    document.querySelectorAll("#clinic-carousel img")
  );
  let currentIndex = 0;

  function openModal(index) {
    currentIndex = index;
    updateModalImage();
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // prevent background scroll
  }

  function closeModal() {
    modal.classList.add("hidden");
    modalImage.src = "";
    document.body.style.overflow = ""; // restore scroll
  }

  function updateModalImage() {
    const image = carouselImages[currentIndex];
    modalImage.src = image.src;
    modalImage.alt = image.alt;
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    updateModalImage();
  }

  function showPrevImage() {
    currentIndex =
      (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    updateModalImage();
  }

  // Event listeners
  carouselImages.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
  });

  closeModalBtn.addEventListener("click", closeModal);
  modalPrevBtn.addEventListener("click", showPrevImage);
  modalNextBtn.addEventListener("click", showNextImage);

  // Close on ESC key
  window.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("hidden")) {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNextImage();
      if (e.key === "ArrowLeft") showPrevImage();
    }
  });

  // Close on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modalImage.parentElement) {
      closeModal();
    }
  });

  // Re-render icons after dynamic content is added
  lucide.createIcons();
});
