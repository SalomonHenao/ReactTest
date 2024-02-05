import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

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
    const response = await axios.get('http://localhost:8000/api/books', { params: filters });
    setBooks(response.data.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/books/${id}`);
    fetchBooks();
  };

  const handleEdit = (book) => {
    setEditBook(book);
    setShowPopup(true);
  };

  const handleFormSubmit = async (bookData) => {
    if (editBook) {
      await axios.put(`http://localhost:8000/api/books/${editBook.id}`, bookData);
    } else {
      await axios.post('http://localhost:8000/api/books', bookData);
    }
    fetchBooks();
    setShowPopup(false);
    setEditBook(null);
  };

  const handleQuantityChange = async (book, delta) => {
    const updatedQuantity = parseInt(book.quantity) + delta;
    if (updatedQuantity < 0) return;

    const updatedBook = { ...book, quantity: updatedQuantity };
    await axios.put(`http://localhost:8000/api/books/${book.id}`, updatedBook);
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
          <BookForm book={editBook} onSubmit={handleFormSubmit} onCancel={() => setShowPopup(false)} />
        </>
      )}
      <table className="table">
        <thead>
          <tr>
            <th className="tableHeader">
              Title<br />
              <input
                type="text"
                name="title"
                value={filters.title}
                onChange={handleFilterChange}
                className="filterInput"
              />
            </th>
            <th className="tableHeader">
              Description<br />
              <input
                type="text"
                name="description"
                value={filters.description}
                onChange={handleFilterChange}
                className="filterInput"
              />
            </th>
            <th className="tableHeader">
              Author<br />
              <input
                type="text"
                name="author"
                value={filters.author}
                onChange={handleFilterChange}
                className="filterInput"
              />
            </th>
            <th className="tableHeader">
              Price<br />
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={filters.price}
                onChange={handleFilterChange}
                className="filterInput"
              />
            </th>
            <th className="tableHeader">
              Quantity<br />
              <input
                type="number"
                name="quantity"
                min="0"
                step="1"
                value={filters.quantity}
                onChange={handleFilterChange}
                className="filterInput"
              />
            </th>
            <th className="tableHeader">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="tableCell">{book.title}</td>
              <td className="tableCell">{book.description}</td>
              <td className="tableCell">{book.author}</td>
              <td className="tableCell">${book.price}</td>
              <td className="tableCell">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {book.quantity}
                  <button className="button" style={{ marginLeft: '10px' }} onClick={() => handleQuantityChange(book, -1)}>-</button>
                  <button className="button" onClick={() => handleQuantityChange(book, 1)}>+</button>
                </div>
              </td>
              <td className="tableCell">
                <button className="button deleteButton actionButton" onClick={() => handleDelete(book.id)}>Delete</button>
                <button className="button actionButton" onClick={() => handleEdit(book)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!Boolean(books.length) && (
        <h2 className="noData">No data found</h2>
      )}
    </div>
  );


};

const BookForm = ({ book, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: book?.title || '',
    description: book?.description || '',
    author: book?.author || '',
    price: book?.price || '',
    quantity: book?.quantity || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="header">{book ? 'Edit Book' : 'Add New Book'}</h1>
      <label htmlFor="title" className="formLabel">Title</label>
      <input
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="formField"
      />
      <label htmlFor="description" className="formLabel">Description</label>
      <input
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="formField"
      />
      <label htmlFor="author" className="formLabel">Author</label>
      <input
        id="author"
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Author"
        className="formField"
      />
      <label htmlFor="price" className="formLabel">Price</label>
      <input
        id="price"
        name="price"
        type="number"
        step="0.01"
        min="0"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="formField"
      />
      <label htmlFor="quantity" className="formLabel">Quantity</label>
      <input
        id="quantity"
        name="quantity"
        type="number"
        step="1"
        min="0"
        value={formData.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        className="formField"
      />
      <button type="submit" className="formButton formSaveButton">Save</button>
      <button type="button" onClick={onCancel} className="formButton formCancelButton">Cancel</button>
    </form>
  );

};

export default App;
