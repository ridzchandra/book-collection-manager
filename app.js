// UI vars
let UItitle = document.querySelector("#title"),
	UIauthor = document.querySelector("#author"),
	UIisbn = document.querySelector("#isbn"),
	UIbookForm = document.querySelector("#book-form"),
	UIbookList = document.querySelector("#book-list");

// Add event Listeners
UIbookForm.addEventListener("submit", onSubmit);
UIbookList.addEventListener("click", deleteBook);

// Classes
class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	static clearFields() {
		UItitle.value = "";
		UIauthor.value = "";
		UIisbn.value = "";
	}

	static displayBooks() {
		let bookList = JSON.parse(localStorage.getItem("bookList"));
		if (bookList === null) {
			bookList = [];
		}
		UIbookList.innerHTML = "";
		bookList.forEach(function (book) {
			let entry = document.createElement("tr");
			entry.innerHTML += `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
            `;
			UIbookList.appendChild(entry);
		});
	}

	static setMessage(msg, msgClass) {
		let UImsg = document.createElement("div");
		UImsg.textContent = msg;
		UImsg.classList.add("alert");
		UImsg.classList.add(msgClass);
		let UIcontainer = document.querySelector(".container");
		UIcontainer.insertBefore(UImsg, UIbookForm);
		setTimeout(function () {
			document.querySelector(".alert").remove();
		}, 3000);
	}
}

document.addEventListener("DOMContentLoaded", UI.displayBooks);

function onSubmit(e) {
	e.preventDefault();

	if (UItitle.value === "" || UIauthor.value === "" || UIisbn.value === "") {
		UI.setMessage("Please ensure all the fields are filled in!", "error");
	} else {
		let bookList = JSON.parse(localStorage.getItem("bookList"));
		console.log(bookList);
		if (bookList === null) {
			bookList = [];
		}
		console.log(bookList);
		bookList.push(new Book(UItitle.value, UIauthor.value, UIisbn.value));
		console.log(bookList);
		localStorage.setItem("bookList", JSON.stringify(bookList));
		UI.displayBooks();
		// clear fields
		UI.clearFields();

		UI.setMessage("Book has been added succesfully!", "success");
	}
}

function deleteBook(e) {
	e.preventDefault();
	let bookList = JSON.parse(localStorage.bookList);
	if (e.target.classList.contains("delete")) {
		targetIsbn = e.target.parentElement.previousElementSibling.textContent;
		bookList.forEach(function (book, index) {
			if (book.isbn === targetIsbn) {
				bookList.splice(index, 1);
			}
		});
		e.target.parentElement.parentElement.remove();
		localStorage.setItem("bookList", JSON.stringify(bookList));
		UI.setMessage("Book has been successfully removed!", "success");
	}
}
