import {
  ALL_COUNTRIES,
  AFRICAN_COUNTRIES,
  EUROPEAN_COUNTRIES,
} from './Countries';

class FakeServer {
  fetchCountries(typeOfCountries) {
    // This is where you would need to fetch your backend, for the purpose of demontrating how this works,
    // we are just going to mock this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        switch (typeOfCountries) {
          case 'All':
            resolve(ALL_COUNTRIES);
            break;
          case 'African':
            resolve(AFRICAN_COUNTRIES);
            break;
          case 'European':
            resolve(EUROPEAN_COUNTRIES);
            break;
        }
      }, 1000);
    });
  }
}

export const FakerServerInput = new FakeServer();
