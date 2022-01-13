import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.addEventListener('input', debounce(getCountries, DEBOUNCE_DELAY));

function getCountries() {
  const inputValue = input.value.trim();
  // fetchCountries(inputValue).then(data => createMarkup(data.results));
  fetchCountries(inputValue).then(country => {
    if (country.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (country.length >= 2 && country.length <= 10) {
      console.log('YEAH!!!, the country has been found');
      console.log(country);
    } else if (!country.length) {
      Notify.failure('Oops, there is no country with that name');
    } else {
      console.log('YEAH!!!, the country has been found');
      console.log(country);
    }
  });
}

function createOneCountryMarkup(name) {
  document.body.append(list);
  const markup = name;
  list.insertAdjacentHTML('beforeend', markup);
}
