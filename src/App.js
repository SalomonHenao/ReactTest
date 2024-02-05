import './App.css';
import React, { useState, useEffect } from 'react';
import { getBooksFromApi, newBookToApi, putBookToApi, deleteBookFromApi } from './utils/Client.js';
import BookForm from './components/Popup.js';
import Table from './components/Table.js';

// Initiate main app
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

  // Fetch Books considering filters
  useEffect(() => {
    fetchBooks();
  }, [filters]);

  // Fetch Books considering filters
  const fetchBooks = async () => {
    const response = await getBooksFromApi(filters);
    setBooks(response.data.data);
  };

  // Delete a book based in the id
  const handleDelete = async (id) => {
    await deleteBookFromApi(id);
    fetchBooks();
  };

  // Edit a book based in the id
  const handleEdit = (book) => {
    setEditBook(book);
    setShowPopup(true);
  };

  // Handles form submit for both create and update
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

  // Handle changes from + and - quantity buttons
  const handleQuantityChange = async (book, delta) => {
    const updatedQuantity = parseInt(book.quantity) + delta;
    if (updatedQuantity < 0) return;

    const updatedBook = { ...book, quantity: updatedQuantity };
    await putBookToApi(book.id, updatedBook)
    fetchBooks();
  };

  // Handles filter changes to trigger retrieval
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  return (
    // Main header
    <div className="container">
      <div className="headerContainer">
        <h1 className="header">Books Inventory</h1>
        {/* New order button */}
        <button className="addButton" onClick={() => setShowPopup(true)}>Add New Book</button>
      </div>
      {showPopup && (
        <>
          <div className="overlay"></div>
          {/* Form component to create/update books */}
          <BookForm
            book={editBook}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowPopup(false)}
          />
        </>
      )}
      {/* Table component to show and interact with books */}
      <Table
        books={books}
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleQuantityChange={handleQuantityChange}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      >
      </Table>
      {/* No data label */}
      {!Boolean(books.length) && (
        <h2 className="noData">No data found</h2>
      )}
    </div>
  );
};

export default App;
