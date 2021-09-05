export default class PixabayApiService {
    constructor() {
        this.page = 1;
        this.BASE_URL = 'https://pixabay.com/api';
        this.searchQuery = '';
    }

    async fetchImage() {
        try {
              const response = await fetch(`${this.BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=23101905-f5de468dd217ea275d2e77ee2`);
              const list = await response.json();
              this.incrimentPage();
              return list.hits;
            
        } catch (error) {
            throw error;
        }  

    }

    incrimentPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}



    
