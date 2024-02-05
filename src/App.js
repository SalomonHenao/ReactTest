import './App.css';
import React, { useState, useEffect } from 'react';
import { getBooksFromApi, newBookToApi, putBookToApi, deleteBookFromApi } from './utils/Client.js';
import BookForm from './components/Popup.js';
import Table from './components/Table.js';

const App = () => {
  const [books, setBooks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [filters, setFilters] = useState({
    title: '',
    description: '',
    author: '',
    price: '',
    quantity: ''
  });

  useEffect(() => {
    fetchBooks();
  }, [filters]);

  const fetchBooks = async () => {
    const response = await getBooksFromApi(filters);
    setBooks(response.data.data);
  };

  const handleDelete = async (id) => {
    await deleteBookFromApi(id);
    fetchBooks();
  };

  const handleEdit = (book) => {
    setEditBook(book);
    setShowPopup(true);
  };

  const handleFormSubmit = async (bookData) => {
    if (editBook) {
      await putBookToApi(editBook.id, bookData)
    } else {
      await newBookToApi(bookData);
    }
    fetchBooks();
    setShowPopup(false);
    setEditBook(null);
  };

  const handleQuantityChange = async (book, delta) => {
    const updatedQuantity = parseInt(book.quantity) + delta;
    if (updatedQuantity < 0) return;

    const updatedBook = { ...book, quantity: updatedQuantity };
    await putBookToApi(book.id, updatedBook)
    fetchBooks();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="container">
      <div className="headerContainer">
        <h1 className="header">Books Inventory</h1>
        <button className="addButton" onClick={() => setShowPopup(true)}>Add New Book</button>
      </div>
      {showPopup && (
        <>
          <div className="overlay"></div>
          <BookForm
            book={editBook}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowPopup(false)}
          />
        </>
      )}
      <Table
        books={books}
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleQuantityChange={handleQuantityChange}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      >
      </Table>
      {!Boolean(books.length) && (
        <h2 className="noData">No data found</h2>
      )}
    </div>
  );
};

export default App;
