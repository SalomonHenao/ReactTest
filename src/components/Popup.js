import React, { useState } from 'react';

const BookForm = ({ book, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: book?.title || '',
        description: book?.description || '',
        author: book?.author || '',
        price: book?.price || '',
        quantity: book?.quantity || '',
    });

    // Handles changes from form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handles submit for both create/update Books
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            {/* Header */}
            <h1 className="form-header">{book ? 'Edit Book' : 'Add New Book'}</h1>
            {/* Form text inputs */}
            <label htmlFor="title" className="formLabel">Title</label>
            <input
                id="title"
                name="title"
                type="text"
                maxLength="100"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="formField"
            />
            <label htmlFor="description" className="formLabel">Description</label>
            <input
                id="description"
                name="description"
                type="text"
                maxLength="100"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="formField"
            />
            <label htmlFor="author" className="formLabel">Author</label>
            <input
                id="author"
                name="author"
                type="text"
                maxLength="100"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author"
                className="formField"
            />
            {/* Form number inputs */}
            <label htmlFor="price" className="formLabel">Price</label>
            <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="$12.34"
                value={formData.price}
                onChange={handleChange}
                className="formField"
            />
            <label htmlFor="quantity" className="formLabel">Quantity</label>
            <input
                id="quantity"
                name="quantity"
                type="number"
                step="1"
                min="1"
                placeholder="1"
                value={formData.quantity}
                onChange={handleChange}
                className="formField"
            />
            {/* Action buttons */}
            <button type="submit" className="formButton formSaveButton">Save</button>
            <button type="button" onClick={onCancel} className="formButton formCancelButton">Cancel</button>
        </form>
    );

};

export default BookForm;