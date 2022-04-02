export function fetchCountries(name, object) {
  const base = 'https://restcountries.com';
  const version = '/v3.1/name/';

  let userInput = `${version}${name}`;

  if (object) {
    const filter = new URLSearchParams(object);
    userInput += `?${filter}`;
  }

  const source = new URL(userInput, base);

  return fetch(source).then(response => {
    
    if (!response.ok || response.status === 404) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
