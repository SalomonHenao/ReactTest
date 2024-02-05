import axios from 'axios';

const getBooksFromApi = async (filters) => {
    return await axios.get('http://localhost:8000/api/books', { params: filters });
};

const newBookToApi = async (bookData) => {
    await axios.post('http://localhost:8000/api/books', bookData);
};

const putBookToApi = async (id, bookData) => {
    await axios.put(`http://localhost:8000/api/books/${id}`, bookData);
};

const deleteBookFromApi = async (id) => {
    await axios.delete(`http://localhost:8000/api/books/${id}`);
};

export { getBooksFromApi, newBookToApi, putBookToApi, deleteBookFromApi };