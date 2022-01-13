export default function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v2/name/';
  return fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,languages`).then(response =>
    response.json(),
  );
}
// console.log(fetch('https://restcountries.com/v3.1/name/peru').then(response => response.json()));
