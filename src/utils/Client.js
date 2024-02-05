import axios from 'axios';

const HOST_URL = 'http://localhost:8000/api/books';

const getBooksFromApi = async (filters) => {
    return await axios.get(HOST_URL, { params: filters });
};

const newBookToApi = async (bookData) => {
    await axios.post(HOST_URL, bookData);
};

const putBookToApi = async (id, bookData) => {
    await axios.put(`${HOST_URL}/${id}`, bookData);
};

const deleteBookFromApi = async (id) => {
    await axios.delete(`${HOST_URL}/${id}`);
};

export { getBooksFromApi, newBookToApi, putBookToApi, deleteBookFromApi };