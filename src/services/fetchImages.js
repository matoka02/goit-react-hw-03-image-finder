// import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37972717-70d116d5c7dba3fcb6f3ce7e2';
const PER_PAGE = 12;
// axios.defaults.baseURL = `https://pixabay.com/api`;

const  fetchImages = async (inputValue, pageNr) => {
  console.log(inputValue, pageNr);
  const resp = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${pageNr}`
  );

  if (resp.ok) {
    const data = await resp.json();
    return data.hits.map(image => {
      return {
        id: image.id,
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
        tags: image.tags,
      };
    });
  } else {
    throw new Error('No images on request');
  }

  // // отклонено
  // const resp = await fetch(
  //   `${BASE_URL}?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${pageNr}`
  // ).then((resp)=>resp.json()); 
  // return resp.hits.map(image => {
  //   return {
  //     id: image.id,
  //     webformatURL: image.webformatURL,
  //     largeImageURL: image.largeImageURL,
  //     tags: image.tags, 
  //   };
  // });
  // const totalHits = resp.totalHits;
  // const total  = resp.hits.length;
  // console.log(total, '/',  totalHits);

  // // отклонено
  // const resp = await axios.get(`/?q=${inputValue}&page=${pageNr}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  // );  

};

export default fetchImages;