const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37972717-70d116d5c7dba3fcb6f3ce7e2';
const PER_PAGE = 40;
// const TOTAL_SERVICE = 500;      // лимит от сервиса Pixabay на бесплатный тариф

async function fetchImages(inputValue, pageNumber) {
    const resp = await fetch(
        `${BASE_URL}?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${pageNumber}`
    );

    if (!resp.ok) {
        if (resp.status === 404) {
            return [];
        }
        throw new Error(resp.status);
        };

    // const data = await resp.json();
    // return data;

    return resp.data.hits.map(image => {
        return {
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags,
        };
    });
};

export default fetchImages;