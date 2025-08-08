import { initUI } from "./ui.js";
import { initKeenTestimonials } from "./keen-testimonials.js";
import { initKeenProducts } from "./keen-products.js";

document.addEventListener("DOMContentLoaded", () => {
  initUI();
  // Keen initializers depend on DOM content injected by UI
  initKeenTestimonials();
  initKeenProducts();
});
