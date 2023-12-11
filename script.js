// Función para obtener y mostrar información del clima mediante una API
const clima = async (city) => {
  // Construye la URL de la API con la clave y la ciudad proporcionadas
  const url = `http://api.weatherapi.com/v1/current.json?key=b22b0498167c41cc922162003231911&q=${city}&aqi=no`;

  try {
    // Realiza la solicitud a la API y espera la respuesta
    const response = await fetch(url);
    const result = await response.json();

    // Obtiene el contenedor principal del DOM
    const $clima = document.getElementById('root');
    
    // Crea un nuevo elemento de tarjeta (card) en el DOM
    const card = document.createElement('div');
    card.classList.add('card');

    // Rellena la tarjeta con la información del clima
    card.innerHTML = `
      <input type="checkbox" class="card-checkbox">
      <h1>${result.location.name}</h1>
      <h2>${result.location.region}</h2>
      <h2>${result.location.country}</h2>
      <h2>${result.location.localtime}</h2>
      <h2>${result.current.temp_c}°C</h2>
      <h2>${result.current.condition.text}</h2>
      <div class="imagen">
        <img src="${result.current.condition.icon}">
      </div>
    `;

    // Inserta la tarjeta en la parte superior del contenedor
    $clima.insertBefore(card, $clima.firstChild);

    // Limpia el campo de entrada después de agregar la tarjeta
    document.getElementById('cityInput').value = '';
    
  } catch (error) {
    console.error(error);
  }
};

// Función para consultar el clima al hacer clic en el botón
const consultarClima = () => {
  const cityInput = document.getElementById('cityInput');
  const city = cityInput.value.trim();

  if (city) {
    // Invoca la función para obtener y mostrar el clima
    clima(city);
  } else {
    alert('Por Favor Ingrese Una Ciudad');
  }
};

// Función para eliminar las tarjetas de clima seleccionadas
const eliminarTarjetas = () => {
  const $clima = document.getElementById('root');
  const checkboxes = $clima.querySelectorAll('.card-checkbox:checked');

  checkboxes.forEach((checkbox) => {
    const cardToRemove = checkbox.closest('.card');
    // Elimina la tarjeta del contenedor
    $clima.removeChild(cardToRemove);
  });
};

// Agrega un evento de clic a todas las tarjetas para seleccionar/deseleccionar
const cards = document.querySelectorAll('.card');
cards.forEach((card) => {
  card.addEventListener('click', () => {
    const checkbox = card.querySelector('.card-checkbox');
    checkbox.checked = !checkbox.checked;
  });
});
