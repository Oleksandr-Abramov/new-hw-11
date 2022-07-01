export default class ApiService {
  static KEY = '25611286-d3301de9845eb7113c68c548e';
  static URL = 'https://pixabay.com/api/';
  page = 1;

  async getData(input) {
    const params = new URLSearchParams({
      q: input,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: false,
      per_page: 40,
      page: this.page,
    });
    try {
      const response = await fetch(
        `${ApiService.URL}?key=${ApiService.KEY}&${params}`
      );
      const img = await response.json();
      return img;
    } catch (error) {
      console.log(error.message);
    }
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
