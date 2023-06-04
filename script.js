// library array
const myLibrary = []

// book class
function Book(name, author, pages, readStatus) {
  this.name = name
  this.author = author
  this.pages = pages
  this.readStatus = readStatus
}

Book.prototype.updateReadStatus = function () {
  this.readStatus = !this.readStatus
}

// AddBook function
function addBookToLibrary(name, author, pages, readStatus) {
  const book = new Book(name, author, pages, readStatus)
  myLibrary.push(book)
}

// RemoveBook function
function removeBookFromLibrary(index) {
  // Based on index remove the book from library array
  myLibrary.forEach((_, i) => {
    if (i == index) {
      myLibrary.splice(i, 1)
    }
  })
}

// updateReadStatus function
function updateReadStatus(index) {
  myLibrary.forEach((book, i) => {
    if (i == index) {
      book.updateReadStatus()
    }
  })
}

// form validation function
function inputValidation(name, author, pages) {
  if (name == '' || author == '' || pages == '') {
    return false
  }
  return true
}

// Render function
function render() {
  // Delete everything from UI
  const tableBody = document.getElementById('table-body')
  tableBody.innerHTML = ''

  // Render everything from myLibrary to UI
  myLibrary.forEach((book, index) => {
    let tableRow = document.createElement('tr')

    tableRow.innerHTML = `
		<td>${book.name}</td>
		<td>${book.author}</td>
		<td class="text-center">${book.pages}</td>
		<td class="text-center">
			<a href="#" data-index="${index}" class="btn read-status ${
      book.readStatus ? 'btn--success' : 'btn--danger'
    }">${book.readStatus ? 'Already read' : 'Not read yet'}</a>
		</td>
		<td class="text-center">
			<a href="#" data-index="${index}" class="btn btn--danger delete">X</a>
		</td>
		`
    tableBody.appendChild(tableRow)
  })
}

// Alert function
function showAlert(msg, cls) {
  const container = document.querySelector('#container')
  const table = document.querySelector('#table')
  const alert = document.createElement('div')
  alert.innerHTML = msg
  alert.className = `alert ${cls}`

  container.insertBefore(alert, table)
  window.setTimeout(() => {
    alert.remove()
  }, 3000)
}

// event: on document load render all books first time
document.addEventListener('DOMContentLoaded', () => {
  render()
})

// Event: on submitting form button add the books
document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault()

  const name = document.getElementById('name')
  const author = document.getElementById('author')
  const pages = document.getElementById('pages')
  const readStatus = document.getElementById('read-status')

  if (inputValidation(name.value, author.value, pages.value)) {
    addBookToLibrary(name.value, author.value, pages.value, readStatus.checked)
    render()
    showAlert('Book added successfully!', 'alert__success')
  } else {
    showAlert('Please fill up the form!', 'alert__danger')
  }
})

// Event: On click on delete button remove books and o click on readStatus button update read status
document.getElementById('table-body').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    removeBookFromLibrary(Number(e.target.getAttribute('data-index')))
    render()
    showAlert('Book deleted!!', 'alert__success')
  }

  if (e.target.classList.contains('read-status')) {
    updateReadStatus(Number(e.target.getAttribute('data-index')))
    render()
    showAlert('Read status updated!!', 'alert__success')
  }
})
