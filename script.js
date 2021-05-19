// Book Class : Represent a book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

// UI class : Handle UI Tasks

class UI{
    static displayBooks(){
        // const StoredBooks = [
        //     {
        //     title:'Book One',
        //     author:'Rishi',
        //     isbn:'15315'
        //     },
        //     {
        //         title:'Book Two',
        //         author:'Abhishekh',
        //         isbn:'78522'
        //     }
        // ];
        // const books = StoredBooks;

        const books = Store.getBooks();

        books.forEach( (book)=>
            UI.addBookToList(book));

    }

    static addBookToList(book) {
        const list = document.getElementById('book-list');

        const row = document.createElement('tr');

        // row.innerHTML = `
        //     <td>${book.title}</td>
        //     <td>${book.author}</td>
        //     <td>${book.isbn}</td>
        //     <td><a href="" class="btn btn-danger btn-sm">X</a></td>
        // `;
        // list.appendChild(row);

        const htmlData = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        row.insertAdjacentHTML('afterbegin', htmlData);

        list.appendChild(row);
    }
    static deleteBook(ele){
        if(ele.classList.contains('delete')){
            ele.parentElement.parentElement.remove();
        }
    }

    // Validation alert 
    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        
        const container = document.querySelector('.container');
        const form = document.getElementById('book-form');
        container.insertBefore(div, form);

        // vanashing after 2sec
        setTimeout(()=>
            document.querySelector('.alert').remove()
        , 3000);
    }

    static clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value= '';
    document.getElementById('isbn').value= '';
    }
    
}   

// Store class: Handles Storage

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('MYbooks') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('MYbooks'));
        }
        return books;
    }
    static addLocalSBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('MYbooks', JSON.stringify(books));
    }
    static removeBook(ISBN){
        const books = Store.getBooks();
        books.forEach( (book, index)=> {
            if(book.isbn === ISBN){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('MYbooks', JSON.stringify(books))
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)


// Event: Add a Book
const addBook = document.querySelector('#book-form');

addBook.addEventListener('submit', (event)=>{
    // Prevent actual submit
    event.preventDefault();

    // Get form Values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // Validate
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill in all fields', 'danger')
    }
    else{
        //  Instantiate book
        const book = new Book(title, author, isbn);  
        console.log(book);

        // Add book to UI
        UI.addBookToList(book);

        // Add book to Store 
        Store.addLocalSBook(book);

        // Show success message
        UI.showAlert("Book Added", 'success');

        // clear Fields
        UI.clearFields();
    }
    
});

// Event: Remove a Book
const Delete_bookList = document.getElementById('book-list');
Delete_bookList.addEventListener('click', (event)=> {
    // console.log(event.target);

    // remove book from UI
    UI.deleteBook(event.target);

    // remove book from store
    Store.removeBook(event.target.parentElement.previousElementSibling.textContent);



    // Show success message
    UI.showAlert("Book Removed", 'success');
})
