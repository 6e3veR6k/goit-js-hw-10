import 'modern-normalize/modern-normalize.css';
import './sass/main.scss';

import { fetchCountries } from './js/fetch.service';
import { showCards, showCard } from './js/render.service';

import debounce from 'lodash.debounce';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  inputBox: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков
const filter = {
  fields: ['name', 'capital', 'population', 'flags', 'languages'],
};

refs.inputBox.addEventListener('input', debounce(onInput, 300));

function onInput(e) {
  const country = e.target.value.trim();

  if (country.length === 0) return;

  fetchCountries(country, filter)
    .then(countries => {
      console.log(countries);

      if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      }

      if (countries.length === 1) {
        refs.countryList.innerHTML = '';
        showCard(refs.countryInfo, countries[0]);
        return;
      }

      if (countries.length >= 2 && countries.length <= 10) {
        refs.countryInfo.innerHTML = '';
        showCards(refs.countryList, countries);
      }
    })
    .catch(e => {
      console.log(e);
      Notify.failure('Oops, there is no country with that name');
    });
}
