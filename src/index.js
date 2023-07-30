import { fetchBreeds, fetchCatByBreed } from './cat-api';
// import SlimSelect from 'slim-select'
// import Notiflix from 'notiflix';

const select = document.getElementsByClassName('breed-select')[0];
const catCard = document.getElementsByClassName('cat-info')[0];
const loader = document.getElementsByClassName('loader')[0];
const errorMessage = document.getElementsByClassName('error')[0];

fetchBreeds()
  .then(data => {
    //   console.log(data);
    select.innerHTML = data
      .map(({ id, name }) => `<option value = "${id}"> ${name}</option>`)
      .join('<br>');

    loader.style.display = 'none';
    select.style.display = 'block';
    errorMessage.style.display = 'none';
  })
  .catch(() => {
    loader.style.display = 'none';
    select.style.display = 'none';
    errorMessage.style.display = 'block';
  });

select.addEventListener('change', event => {
  catCard.style.display = 'none';
  loader.style.display = 'block';
  errorMessage.style.display = 'none'; 

  const id = event.currentTarget.value;

  function createCatMenu(data) {
    return data
      .map(
        ({ url, breeds: [{ name, description, temperament }] }) =>
          `<div>
              <img src="${url}" alt="${name}" width="360px"style="margin-right: 20px; margin-top: 20px" />
            </div>
         <div>
              <h2>${name}</h2>
              <p>${description}</p>
              <h2>Temperament:</h2>
              <p>${temperament}</p>
         </div>`
      )
      .join('');
  }

  fetchCatByBreed(id)
    .then(data => {     
      catCard.innerHTML = createCatMenu(data);
      
      catCard.style.display = 'flex';
      loader.style.display = 'none';
      errorMessage.style.display = 'none';      
    })
      
    .catch(() => {
      loader.style.display = 'none';
      errorMessage.style.display = 'block';
    });
});









