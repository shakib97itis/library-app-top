function main() {
	// Form display functionality
	formShowBtn.addEventListener('click', () => {
		formContainer.classList.remove('d-none')
	})

	formCloseBtn.addEventListener('click', () => {
		formContainer.classList.add('d-none')
	})

	form.addEventListener('submit', (e) => {
		e.preventDefault()
		formContainer.classList.add('d-none')
		inputValidation()
	})
}

// Book Constructor
function Book(title, author, readStatus, pages) {
	this.title = title
	this.author = author
	this.readStatus = readStatus
	this.pages = pages
}

Book.prototype.updateReadStatus = function (status) {
	this.readStatus = status
}

let myLibrary = []

// DOM Selectors
const formContainer = document.getElementById('form-container')
const form = document.getElementById('book-form')
const formShowBtn = document.getElementById('form-show-btn')
const formCloseBtn = document.getElementById('form-close-btn')
const formSubmitBtn = document.getElementById('form-submit-btn')
const tableBody = document.getElementById('table-body')

function inputValidation() {
	let bookName = document.getElementById('book-name').value
	let author = document.getElementById('book-author').value
	let readStatus = document.getElementById('read-status').checked
	let pages = document.getElementById('book-pages').value

	if (bookName === '' || author === '' || pages === '') {
		console.log('false')
		return false
	} else {
		addBookToLibrary(bookName, author, readStatus, pages)
	}
}

function addBookToLibrary(bookName, author, readStatus, pages) {
	let book = new Book(bookName, author, pages, readStatus)
	myLibrary.push(book)
	displayBooks()
}

function displayBooks() {
	if (myLibrary.length) {
		const dataRows = document.querySelectorAll('.data-row')
		dataRows.forEach((row) => {
			row.remove()
		})
	}

	myLibrary.forEach((book, index) => {
		let row = document.createElement('tr')
		row.classList.add('data-row')
		row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td class="text-center"><button class="btn ${book.readStatus? "btn-success" : "btn-warning"} read-btn" data-index="${index}">${
			book.readStatus ? 'Read' : 'Not Read'
		}</button></td>
    <td class="text-center"><button class="btn btn-danger delete-btn" data-index="${index}">Delete</button></td>`
		tableBody.appendChild(row)
	})

	deleteElement()
	updateStatus()
}

function deleteElement() {
	const deleteButtons = document.querySelectorAll('.delete-btn')
	deleteButtons.forEach((button) => {
		button.addEventListener('click', () => {
			button.parentElement.parentElement.remove()
			myLibrary.splice(button.getAttribute('data-index'), 1)
			displayBooks()
		})
	})
}

function updateStatus() {
	const readButton = document.querySelectorAll('.read-btn')
	readButton.forEach((btn) => {
		btn.addEventListener('click', () => {
			let index = btn.getAttribute('data-index')
			if (myLibrary[index].readStatus) {
				myLibrary[index].updateReadStatus(false)
				displayBooks()
			} else {
				myLibrary[index].updateReadStatus(true)
				displayBooks()
			}
		})
	})
}

main()
