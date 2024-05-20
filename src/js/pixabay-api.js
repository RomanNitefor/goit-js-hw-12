import axios from 'axios';
export async function searchPictures(searchTerm, page, limit) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=43779125-040e3030fad6a4afa34a77542&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching pictures:', error);
    throw error;
  }
}
