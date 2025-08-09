import { servicesData, testimonialsData } from "./data.js";
import { createServiceCard, createTestimonialCard } from "./render.js";

function initLucide() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

function initMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

function initClinicCarousel() {
  const clinicCarousel = document.getElementById("clinic-carousel");
  if (!clinicCarousel) return;

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
    console.log("AutoPlay started");
  }
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
    console.log("AutoPlay stopped");
  }

  nextBtn?.addEventListener("click", () => {
    nextSlide();
    stopAutoPlay();
    startAutoPlay();
  });
  prevBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
    stopAutoPlay();
    startAutoPlay();
  });

  showSlide(currentIndex);
  startAutoPlay();

  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalPrevBtn = document.getElementById("modalPrevBtn");
  const modalNextBtn = document.getElementById("modalNextBtn");
  const carouselImages = Array.from(
    document.querySelectorAll("#clinic-carousel img")
  );
  if (!modal || !modalImage || !closeModalBtn || !modalPrevBtn || !modalNextBtn)
    return;

  function openModal(index) {
    updateModalImage(index);
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.add("hidden");
    modalImage.src = "";
    document.body.style.overflow = "";
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

  carouselImages.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
  });
  closeModalBtn.addEventListener("click", closeModal);
  modalPrevBtn.addEventListener("click", showPrevImage);
  modalNextBtn.addEventListener("click", showNextImage);
  window.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("hidden")) {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNextImage();
      if (e.key === "ArrowLeft") showPrevImage();
    }
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modalImage.parentElement) closeModal();
  });
}

function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("tab-active"));
      tabContents.forEach((content) => content.classList.add("hidden"));
      button.classList.add("tab-active");
      document.getElementById(button.dataset.tab)?.classList.remove("hidden");
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
}

function populateServices() {
  const servicosGrid = document.getElementById("servicos-grid");
  if (servicosGrid) {
    servicosGrid.innerHTML = servicesData.map(createServiceCard).join("");
  }
  const servicosSlider = document.getElementById("slider-produtos");
  if (servicosSlider) {
    servicosSlider.innerHTML = servicesData.map(createServiceCard).join("");
  }
  initLucide();
}

function populateTestimonials() {
  const grid = document.getElementById("keen-slider");
  if (!grid) return;
  grid.innerHTML = testimonialsData.map(createTestimonialCard).join("");
  initLucide();
  window.dispatchEvent(new CustomEvent("testimonialsLoaded"));
}

function initAccordion() {
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

      // Fecha item
      if (isActive) {
        item.classList.remove("accordion-item-active");
        content.style.maxHeight = 0;
        icon.style.transform = "rotate(0deg)";
      }

      // Fecha todos os itens
      // accordionItems.forEach((i) => {
      //   i.classList.remove("accordion-item-active");
      //   i.querySelector(".accordion-content").style.maxHeight = 0;
      //   i.querySelector(".accordion-icon").style.transform = "rotate(0deg)";
      // });

      // Se o item clicado não estava ativo, abre ele
      if (!isActive) {
        item.classList.add("accordion-item-active");
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = "rotate(180deg)";
      }
    });
  });
}

export function initUI() {
  initLucide();
  initMobileMenu();
  initClinicCarousel();
  initTabs();
  populateServices();
  populateTestimonials();
  initAccordion();
}
