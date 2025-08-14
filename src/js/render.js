// Render helpers for cards

export function createServiceCard(service) {
  return `
		<div class="keen-slider__slide bg-gray-50 p-8 rounded-2xl text-left flex flex-col shadow-xl">
			<div class="bg-[#5E3B8C] text-white w-14 h-14 rounded-xl flex items-center justify-center mb-4">
				<i data-lucide="${service.icon}" class="w-8 h-8 text-[#FFDBFD]"></i>
			</div>
			<h3 class="text-xl font-bold text-purple-800 mb-2">${service.title}</h3>
			<p class="text-gray-600 flex-grow">${service.description}</p>
		</div>
	`;
}

export function createTestimonialCard(testimonial) {
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
