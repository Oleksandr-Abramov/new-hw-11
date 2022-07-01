import ApiService from './apiService';
const Api = new ApiService();

const form = document.querySelector('.search-form');
form.addEventListener('submit', onInputForm);

function onInputForm(evt) {
  evt.preventDefault();
  // form.searchQuery.value;
  console.log('~ form.searchQuery.value;', form.searchQuery.value);
  //   Api.getData();
}
