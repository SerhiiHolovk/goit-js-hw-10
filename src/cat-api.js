import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1'
axios.defaults.headers.common["x-api-key"] = "live_AVIzYw1MUQOS4SshhbZ5nXcrwp3xby8juAjl8QcfQhXLwdQ3hNq9t8GznliMuyGX";

const select = document.getElementsByClassName('breed-select')[0];
const errorMesage = document.getElementsByClassName('error')[0];

// функція на запит з колекції порід котиків

function fetchBreeds() {
  select.style.display = 'none';
  errorMesage.style.display = 'none';
  return axios.get('/breeds').then(response => {
    return response.data;
  });
}

// функція на запит повної інформації про кота за ID

function fetchCatByBreed(id) {
  return axios
    .get(`/images/search?breed_ids=${id}&api_key=live_AVIzYw1MUQOS4SshhbZ5nXcrwp3xby8juAjl8QcfQhXLwdQ3hNq9t8GznliMuyGX`)
    .then(response => {
      return response.data;
    });
}
//експорт в index.js
export { fetchBreeds, fetchCatByBreed };