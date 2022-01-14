export default function createFewCountriesMarkup(country) {
  const markup = country
    .map(country => {
      return `<li class="country">
        <img src="${country.flags.svg}" alt="${country.name}">
        <p class="countries">${country.name}</p>
        </li>`;
    })
    .join('');
  return markup;
}
