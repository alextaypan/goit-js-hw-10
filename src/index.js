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
  fetchCountries(inputValue).then(country => {
    if (country.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (country.length >= 2 && country.length <= 10) {
      console.log('YEAH!!!, the country has been found');
      console.log(country);
      list.innerHTML = createFewCountriesMarkup(country);
    } else if (!country.length) {
      Notify.failure('Oops, there is no country with that name');
    } else {
      console.log('YEAH!!!, the country has been found');
      console.log(country);
      info.innerHTML = createOneCountryMarkup(country);
    }
  });
}

function createFewCountriesMarkup(country) {
  const markup = country
    .map(country => {
      return `<li class="country">
        <img src="${country.flags.svg}" alt="${country.name}">
        <p>${country.name}</p>
        </li>`;
    })
    .join('');
  return markup;
}

function createOneCountryMarkup(country) {
  const markup = country
    .map(country => {
      return `<div class="title"><img src="${country.flags.svg}" alt="${country.name}">
            <h1> ${country.name}</h1></div>
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Languages: ${Object.values(country.languages.map(language => language.name))}</p>`;
    })
    .join('');
  return markup;
}

{
  /* <p class="capital"><span class="text">Capital: </span>{{capital}}</p>
        <p class="population"><span class="text">Population: </span>{{population}}</p>
        <ul class="languages"><span class="text">Languages:</span>{{#each languages}} */
}
