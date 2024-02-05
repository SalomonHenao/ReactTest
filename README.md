# Books Inventory Management - Frontend

A React application designed to manage a books inventory. This project allows users to view, filter, add, edit, and delete books through a user-friendly interface. It interacts with a backend API to perform CRUD operations.

## Features

- **View Books**: List all books with details including title, description, author, price, and quantity.
- **Add New Book**: Utilize a popup form to input details of a new book and add it to the inventory.
- **Edit Book**: Select a book from the inventory to edit its details in the popup form.
- **Delete Book**: Remove a book from the inventory.
- **Filter Books**: Apply filters based on book attributes like title, description, author, price, and quantity.

## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm (Node Package Manager)
- A running backend API server that this frontend interacts with

### Installing

1. **Clone the Repository**
```
git clone https://github.com/SalomonHenao/ReactTest.git
cd ReactTest
```
2. **Install Dependencies**
```npm install```
3. **Configure API Endpoint**
Make sure to configure the API endpoint in `./utils/Client.js` to match your backend API server.
4. **Run the Application**
```npm start```
This command runs the app in development mode. Open `http://localhost:3000` to view it in the browser.

## Using the Application
View Books: Simply open the application to see the list of books.
Add a Book: Click the "Add New Book" button and fill in the book details in the popup form.
Edit/Delete a Book: Use the "Edit" or "Delete" buttons next to each book entry in the list.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or create an issue for bug reports, features, or improvements.