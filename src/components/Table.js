const Table = ({
    books = [],
    filters = {},
    handleFilterChange = () => { },
    handleQuantityChange = () => { },
    handleEdit = () => { },
    handleDelete = () => { }
}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="tableHeader">
                        Title<br />
                        <input
                            type="text"
                            name="title"
                            maxLength="100"
                            value={filters.title}
                            onChange={handleFilterChange}
                            className="filterInput"
                            placeholder='Search by Title'
                        />
                    </th>
                    <th className="tableHeader">
                        Description<br />
                        <input
                            type="text"
                            name="description"
                            maxLength="100"
                            value={filters.description}
                            onChange={handleFilterChange}
                            className="filterInput"
                            placeholder='Search by Description'
                        />
                    </th>
                    <th className="tableHeader">
                        Author<br />
                        <input
                            type="text"
                            name="author"
                            maxLength="100"
                            value={filters.author}
                            onChange={handleFilterChange}
                            className="filterInput"
                            placeholder='Search by Author'
                        />
                    </th>
                    <th className="tableHeader">
                        Price<br />
                        <input
                            type="number"
                            name="price"
                            min="0.01"
                            step="0.01"
                            value={filters.price}
                            onChange={handleFilterChange}
                            className="filterInput"
                            placeholder='Search by Price'
                        />
                    </th>
                    <th className="tableHeader">
                        Quantity<br />
                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            step="1"
                            value={filters.quantity}
                            onChange={handleFilterChange}
                            className="filterInput"
                            placeholder='Search by Quantity'
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
    );

};

export default Table;