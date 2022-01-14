export default function createOneCountryMarkup(country) {
  const markup = country
    .map(country => {
      return `<div class="title">
      <img src="${country.flags.svg}" alt="${country.name}">
            <h1> ${country.name}</h1>
            </div>
            <p class="capital"><span class="text">Capital: </span>${country.capital}</p>
            <p class="population"><span class="text">Population: </span> ${country.population}</p>
            <p class="languages"><span class="text">Languages: </span>${Object.values(
              country.languages.map(language => language.name),
            )}</p>`;
    })
    .join('');
  return markup;
}
