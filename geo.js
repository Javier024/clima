;(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error)
  } else {
    alert('Geolocation no es soportada en este navegador')
  }
})()

function success(position) {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  getMap(latitude, longitude)
}

function error() {
  alert('No se puede recibir la ubicación')
}

var map
function getMap() {
  map = L.map('map').setView([8.95, -75.45], 12) // 10 es el zoom
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
  L.marker([8.95, -75.45]).addTo(map).bindPopup('Tu estas<b>AQUÍ</b>').openPopup()
}
