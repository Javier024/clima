const API_KEY = '6c5e7bf84fbb6a119c76f0a885868c9e'
const municipiosCordoba = [
  { nombre: 'Montería', latitud: 8.74798, longitud: -75.88143 },
  { nombre: 'Ayapel', latitud: 8.3125, longitud: -75.1415 },
  { nombre: 'Buenavista', latitud: 8.68444, longitud: -75.73389 },
  { nombre: 'Canalete', latitud: 8.67611, longitud: -76.24361 },
  { nombre: 'Cereté', latitud: 8.88528, longitud: -75.79222 },
  { nombre: 'Chimá', latitud: 9.14917, longitud: -75.63611 },
  { nombre: 'Chinú', latitud: 9.10583, longitud: -75.39611 },
  { nombre: 'Ciénaga de Oro', latitud: 8.87556, longitud: -75.62139 },
  { nombre: 'Cotorra', latitud: 9.03917, longitud: -75.79056 },
  { nombre: 'La Apartada', latitud: 7.88556, longitud: -75.33472 },
  { nombre: 'Los Córdobas', latitud: 8.90361, longitud: -76.35472 },
  { nombre: 'Momil', latitud: 9.23778, longitud: -75.67583 },
  { nombre: 'Montelíbano', latitud: 7.98083, longitud: -75.41667 },
  { nombre: 'Moñitos', latitud: 9.24722, longitud: -76.13056 },
  { nombre: 'Planeta Rica', latitud: 8.41472, longitud: -75.58833 },
  { nombre: 'Pueblo Nuevo', latitud: 8.23389, longitud: -75.58306 },
  { nombre: 'Puerto Escondido', latitud: 9.01861, longitud: -76.25972 },
  { nombre: 'Puerto Libertador', latitud: 7.88917, longitud: -75.67361 },
  { nombre: 'Purísima', latitud: 9.23611, longitud: -75.72361 },
  { nombre: 'Sahagún', latitud: 8.94917, longitud: -75.44611 },
  { nombre: 'San Andrés de Sotavento', latitud: 9.145, longitud: -75.50861 },
  { nombre: 'San Antero', latitud: 9.37333, longitud: -75.75861 },
  { nombre: 'San Bernardo del Viento', latitud: 9.35694, longitud: -76.13333 },
  { nombre: 'San Carlos', latitud: 8.79722, longitud: -75.69861 },
  { nombre: 'San José de Uré', latitud: 7.7875, longitud: -75.53361 },
  { nombre: 'San Pelayo', latitud: 8.95861, longitud: -75.79472 },
  { nombre: 'Lorica', latitud: 9.23194, longitud: -75.81389 },
  { nombre: 'Tierralta', latitud: 8.17111, longitud: -76.05917 },
  { nombre: 'Tuchín', latitud: 9.18944, longitud: -75.55417 },
  { nombre: 'Valencia', latitud: 8.25778, longitud: -76.15722 },
]

const selectMunicipios = document.querySelector('#municipios')
municipiosCordoba.forEach((municipio) => {
  const option = document.createElement('option')
  option.value = municipio.nombre
  option.textContent = municipio.nombre
  selectMunicipios.appendChild(option)
})

const coordedadasT = document.querySelector('#table-coordenadas')
const log = document.querySelector('#log')
const lat = document.querySelector('#lat')
const buttonForm = document.querySelector('#button-form')
const table = document.querySelector('#table-body')
const currentMap = document.querySelector('#map')

let item = 0
let datosGenerales

buttonForm.addEventListener('click', async (e) => {
  e.preventDefault()
  table.innerHTML = ''
  // currentMap.innerHTML = ''
  // currentMap.outerHTML = `<div id="map" class="col" style="width: 50%; aspect-ratio: calc(16 / 9); margin: auto"></div>`
  coordedadasT.removeAttribute('hidden')

  item = 0
  const municipio = selectMunicipios.value
  const coordenadas = municipiosCordoba.find((m) => m.nombre === municipio)
  if (!coordenadas) {
    alert('Municipio no encontrado')
    return
  }
  log.textContent = coordenadas.longitud
  lat.textContent = coordenadas.latitud
  const urlGeneral = `https://api.openweathermap.org/data/2.5/weather?lat=${coordenadas.latitud}&lon=${coordenadas.longitud}&appid=${API_KEY}`
  try {
    map.setView([coordenadas.latitud, coordenadas.longitud], 12) // 10 es el zoom
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
    L.marker([coordenadas.latitud, coordenadas.longitud]).addTo(map).bindPopup('Tu estas<b>AQUÍ</b>').openPopup()
    const response = await fetch(urlGeneral)
    const data = await response.json()

    const presipitacion = data.rain ? Object.values(data.rain)[0] : 0

    datosGenerales = {
      temperatura_actual: data.main.temp,
      sensacion_termica: data.main.feels_like,
      temperatura_minima: data.main.temp_min,
      temperatura_maxima: data.main.temp_max,
      presion_admosferica: data.main.pressure,
      humedad: data.main.humidity,
      velocidad_viento: data.wind.speed,
      direccion_viento: data.wind.deg,
      nubosidad: data.clouds.all,
      precipitacion: presipitacion ?? 'SIN PRECIPITACIÓNES',
      hora_puesta: data.sys.sunset,
      hora_salida: data.sys.sunrise,
    }

    for (const prop in datosGenerales) {
      item += 1

      const thItem = document.createElement('th')
      const thCampo = document.createElement('th')
      const thDescription = document.createElement('th')
      const tr = document.createElement('tr')

      thItem.textContent = item
      thCampo.textContent = prop.split('_').join(' ')
      thDescription.textContent = datosGenerales[prop]

      thItem.setAttribute('scope', 'row')

      tr.appendChild(thItem)
      tr.appendChild(thCampo)
      tr.appendChild(thDescription)
      table.appendChild(tr)
    }
  } catch (error) {
    console.error('Error al obtener datos del clima:', error)
  }
})
