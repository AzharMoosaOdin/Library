let container = document.querySelector(".container");
let addBookButton = document.querySelector("#newBook");
let submit = document.querySelector("#add");
let form = document.querySelector("#addBook");
let count = 0;
let myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function() {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
	}
}


function addBookToLibrary(book) {
	myLibrary.push(book);
}

function addBookToTable() {
	let table = document.createElement("table");
	table.id = "library";
	let tableBody = document.createElement("tbody");
	tableBody.id = "library-body";
	container.appendChild(table);
	table.appendChild(tableBody);
	let r = document.createElement("tr")
	let ti = document.createElement("th")
	let au = document.createElement("th")
	let pg = document.createElement("th")
	let de = document.createElement("th")
	let tgr = document.createElement("th")

	ti.textContent = "Title";
	au.textContent = "Author";
	pg.textContent = "Number of Pages";
	tgr.textContent = "Read?";
	de.textContent = "Delete?";

	tableBody.appendChild(r);
	r.appendChild(ti);
	r.appendChild(au);
	r.appendChild(pg);
	r.appendChild(tgr);
	r.appendChild(de);

	myLibrary.forEach((book) => {
		let row = document.createElement("tr");
		let title = document.createElement("td");
		let author = document.createElement("td");
		let pages = document.createElement("td");
		let del = document.createElement("td");
		let toggleRead = document.createElement("td");

		let delButton = document.createElement("button");
		delButton.textContent = "X";
		delButton.id = count;
		delButton.classList.add("delete");
		delButton.onclick = function del() {
			myLibrary.splice(delButton.id, 1);
			let tbl = document.querySelector("#library");
			container.removeChild(tbl);
			addBookToTable();
		}

		let markRead = document.createElement("button");
		markRead.textContent = "Read";
		markRead.id = count;
		if (myLibrary[markRead.id].read == true) {
			markRead.classList.add("read-true")
		} else if (myLibrary[markRead.id].read == false) {
			markRead.classList.add("read-false");
		}
		markRead.onclick = function toggle() {
		if (myLibrary[markRead.id].read == true) {
			myLibrary[markRead.id].read = false;
			markRead.classList.remove("read-true");
			markRead.classList.add("read-false")
		} else if (myLibrary[markRead.id].read == false) {
			myLibrary[markRead.id].read = true;
			markRead.classList.remove("read-false");
			markRead.classList.add("read-true");
		}
		}
		count += 1;
		title.textContent = book.title;
		author.textContent = book.author;
		pages.textContent = book.pages;
		del.appendChild(delButton);
		toggleRead.appendChild(markRead);

		row.appendChild(title);
		row.appendChild(author);
		row.appendChild(pages);
		row.appendChild(toggleRead);
		row.appendChild(del);
		tableBody.appendChild(row);
	})
	count = 0;
}

function addBook() {
	form.style.visibility = "visible";
	submit.addEventListener("click", () => {
		let title = document.getElementById("title").value;
		let author = document.getElementById("author").value;
		let pages = document.getElementById("pages").value;
		let book = new Book(title, author, pages, false);
		addBookToLibrary(book);
		let tbl = document.querySelector("#library");
		container.removeChild(tbl);
		form.style.visibility = "hidden";
		addBookToTable();
	});
}


const deathlyHallows = new Book("Harry Potter and the Deathly Hallows", "J. K. Rowling", 607, false);
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary(theHobbit);
addBookToLibrary(deathlyHallows);
addBookToTable();
addBookButton.addEventListener("click", () => {
	addBook();
})


