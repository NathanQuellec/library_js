const cardArea = document.querySelector("#cardArea");
const buttonForm = document.querySelector("#showForm");
const buttonClear = document.querySelector("#deleteLibrary");
const form = document.querySelector("#form");
const closeForm = document.querySelector("#closeForm");
const readElem = document.querySelector("#readStatus");

/* const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 235, true);
const book2 = new Book("The Things", "Stephen King", 400, false); */
 
let myLibrary = [];
let currentID = 0;
let readStatus = false;

buttonForm.addEventListener("click", showForm);
buttonClear.addEventListener("click", clearLibrary);
form.addEventListener("submit", addBookToLibrary);
closeForm.addEventListener("click", hideForm);
readElem.addEventListener("click", toggleReadStatus);

//test 

class Book {

    constructor(id, title, author, pages, read){
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    
}

function clearLibrary(){
    myLibrary = [];
    currentID = 0;
    readStatus = false;
    window.localStorage.clear();
    document.location.reload();
}

function getLibrary(){
    if(window.localStorage.getItem("myLibrary")){
        myLibrary = JSON.parse(window.localStorage.getItem("myLibrary"));
        currentID = window.localStorage.getItem("currentID");
    }      
}

function saveLibrary(){
    window.localStorage.setItem("currentID", currentID);
    window.localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function showForm(){
    form.style.display = "block";
}

function hideForm(){
    form.style.display = "none";
}

function toggleReadStatus(){
    if(!readStatus){
        readStatus = true;
        readElem.style.backgroundColor = "green";
    }
    else{
        readStatus = false;
        readElem.style.backgroundColor = "red";
    }
}

function addBookToLibrary(){    
    let result = document.forms["form"];
    const book = new Book(
            currentID,
            result["title"].value,
            result["author"].value,
            result["pages"].value,
            readStatus
    );
    myLibrary.push(book);
    currentID++;
    saveLibrary();
    displayBooks();
}

function displayBooks(){
        myLibrary.forEach( book => {

            if(!book)
                return;

            const card = document.createElement("div");
            card.classList.add("card");

            const titleCard = document.createElement("p");
            titleCard.textContent = book.title;

            const authorCard = document.createElement("p");
            authorCard.textContent = book.author;

            const pagesCard = document.createElement("p");
            pagesCard.textContent = book.pages + " pages";

            const readLabel = document.createElement("p");
            if(book.read)
                readLabel.textContent = "Read";
            else
                readLabel.textContent = "Not Read";

            const deleteCardButton = document.createElement("button");
            deleteCardButton.classList.add("deleteCardButton");
            deleteCardButton.textContent = "Supprimer";
            deleteCardButton.addEventListener("click", () => {
                myLibrary[book.id] = undefined;
                saveLibrary();
                document.location.reload();
            });

            card.appendChild(titleCard);
            card.appendChild(authorCard);
            card.appendChild(pagesCard);
            card.appendChild(readLabel);
            card.appendChild(deleteCardButton);
            cardArea.appendChild(card);
        }
    );
}

getLibrary();
displayBooks();