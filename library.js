const myLibrary = [];
let n = 0; 
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.number = n;
    n++;
}

function addBookToLibrary(title, author, pages, read) {
    const temp = new Book(title, author, pages, read);
    myLibrary.push(temp);
}

function displayBooks() {
    const library = document.querySelector(".bookshelf");

    library.innerHTML = '';
    myLibrary.forEach(book => {
        
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
            <div>Title: ${book.title}</div>
            <div>Author: ${book.author}</div>
            <div>Pages: ${book.pages}</div>
            <div>Read: ${book.read ? 'Yes' : 'No'}</div>
            <button class="delete-button" data-id="${book.number}">Delete</button>
            <button class="toggle-read-button" data-id="${book.number}">Toggle Read Status</button>
        `;
        library.appendChild(bookDiv);

        document.querySelectorAll('.toggle-read-button').forEach(button => {
            button.addEventListener('click', function(e) {
                const bookNumber = parseInt(this.getAttribute('data-id'));
                const book = myLibrary.find(book => book.number === bookNumber);
                book.toggleReadStatus();
                displayBooks(); 
                
            });
        });
    });
}

document.querySelector(".form").addEventListener('submit', e => {
    e.preventDefault(); 
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, read);
    displayBooks();
    document.querySelector(".form").reset();
});


document.addEventListener('click', e => {
    if (e.target.classList.contains('delete-button')) {
        const bookNumber = e.target.getAttribute('data-id');
        const bookIndex = myLibrary.findIndex(book => book.number === parseInt(bookNumber));
        if (bookIndex !== -1) {
            myLibrary.splice(bookIndex, 1);
            displayBooks();
        }
    }
});

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

