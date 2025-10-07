const buttons = document.querySelectorAll('.btn-map');
const modal = document.getElementById('map-modal');
const iframe = document.getElementById('modal-iframe');
const closeBtn = document.getElementById('close-modal');
const addressDiv = document.getElementById('map-address');
const openInMaps = document.getElementById('open-in-maps'); // abrir ubicación
const directionsBtn = document.getElementById('directions-btn'); // nuevo botón rutas

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const mapSrc = btn.getAttribute('data-map');        // embed para iframe
    const mapLink = btn.getAttribute('data-link');      // link directo a Google Maps
    const addressText = btn.getAttribute('data-address'); // texto de dirección

    // Mostrar en modal
    iframe.src = mapSrc;
    addressDiv.textContent = addressText;

    // Abrir ubicación en Google Maps
    openInMaps.href = mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`;

    // Generar ruta desde ubicación actual hasta el destino
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${encodeURIComponent(addressText)}`;
    directionsBtn.href = directionsUrl;

    // Mostrar modal con animación
    modal.style.display = 'flex';
    modal.scrollTop = 0;
    setTimeout(() => {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // bloquear scroll
    }, 10);
  });
});

// Función para cerrar modal
function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
  setTimeout(() => {
    modal.style.display = 'none';
    iframe.src = '';
    addressDiv.textContent = '';
    openInMaps.href = '#';
    directionsBtn.href = '#';
  }, 300);
}

// Eventos cerrar modal
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
