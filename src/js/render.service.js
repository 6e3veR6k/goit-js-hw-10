export function showCard(divLink, country) {
  const {
    name: { official: name },
    capital: [capital],
    population,
    flags: { svg: flag },
    languages,
  } = country;

  console.log(country);
  console.log({ name, capital, population, flag, languages });

  divLink.innerHTML = createCountryItem({ name, capital, population, flag, languages });
}

export function showCards(ulLink, countries) {
  const listItems = countries.map(({ name: { official: name }, flags: { svg: flag } }) => {
    return createListItem({ name, flag });
  });

  insertItemsToList(ulLink, listItems);
}

function createListItem({ name, flag }) {
  const temp = document.createElement('div');

  const listItem = document.createElement('li');
  listItem.classList.add('country-list__item');

  const card = document.createElement('div');
  card.classList.add('card');

  // const img = document.createElement('img');
  // img.classList.add('card-img');
  // img.src = flag;
  // img.alt = `${name} Flag`;
  // img.height = 48;

  const img = document.createElement('div');
  img.classList.add('card-img');
  img.style.backgroundImage = `url(${flag})`;

  const text = document.createElement('p');
  text.classList.add('card-text');
  text.textContent = name;

  card.append(img, text);
  listItem.appendChild(card);
  temp.append(listItem);

  return temp.innerHTML;
}

function insertItemsToList(ulLink, listItems) {
  const string = listItems.join('');
  ulLink.innerHTML = '';
  ulLink.insertAdjacentHTML('afterbegin', string);
}

function createCountryItem({ name, capital, population, flag, languages }) {
  // capital: ['Bandar Seri Begawan']
  // flags: {png: 'https://flagcdn.com/w320/bn.png', svg: 'https://flagcdn.com/bn.svg'}
  // languages: {msa: 'Malay'}
  // name: {common: 'Brunei', official: 'Nation of Brunei, Abode of Peace', nativeName: {…}}
  // population: 437483

  return `
        <div class="country-info__header">
        <img src="${flag}" alt="${name} flag">
        <p class="country-info__title">${name}</p>
      </div>
      <div class="country-info__content">
        <p class="country-info__text"><span>capital:</span>${capital}</p>
        <p class="country-info__text"><span>population:</span>${population}</p>
        <p class="country-info__text"><span>languages:</span>${Object.values(languages).join(', ')}</p>
      </div>
  `;
}
