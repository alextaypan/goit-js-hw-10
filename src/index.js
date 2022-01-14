import './css/styles.css';
import fetchCountries from './fetchCountries';
import createFewCountriesMarkup from './createFewCountriesMarkup';
import createOneCountryMarkup from './createOneCountryMarkup';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
const failNotif = 'Oops, there is no country with that name';
const failInform = 'Too many matches found. Please enter a more specific name.';

input.addEventListener('input', debounce(getCountries, DEBOUNCE_DELAY));

function getCountries() {
  const inputValue = input.value.trim();
  if (!inputValue) {
    clearMarkup(list, '');
    clearMarkup(info, '');
  }
  fetchCountries(inputValue)
    .then(country => {
      let failCountry = !country.length;
      if (country.length === 1) {
        info.innerHTML = createOneCountryMarkup(country);
        clearMarkup(list, '');
      } else if (country.length >= 2 && country.length <= 10) {
        list.innerHTML = createFewCountriesMarkup(country);
        clearMarkup(info, '');
      } else if (country.length > 10) {
        Notify.info(failInform);
      } else {
        failCountry = Notify.failure(failNotif);
        clearMarkup(list, '');
        clearMarkup(info, '');
      }
    })
    .catch(error => Notify.failure(failNotif));
}

function clearMarkup(where, what) {
  where.innerHTML = what;
}
