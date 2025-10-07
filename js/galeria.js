const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
let index = 0;
let autoSlide; // intervalo automático

function showSlide(i) {
  // 🔹 Evita retroceder: siempre incrementa
  index = i % slides.length; // esto crea bucle infinito hacia adelante
  track.style.transition = "transform 0.6s ease-in-out";
  track.style.transform = `translateX(-${index * 100}%)`;

  // 🔹 Efecto animado: añade clase "active" al slide
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

function nextSlide() {
  showSlide(index + 1);
}

// ❌ eliminamos prevSlide y prevButton para que no retroceda
// function prevSlide() { showSlide(index - 1); }

// Botones
nextButton.addEventListener('click', () => {
  nextSlide();
  resetAutoSlide();
});

// ❌ quitamos prevButton si no quieres retroceder
// prevButton.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

// 🔹 Automático cada 3s
function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 6000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

startAutoSlide();
