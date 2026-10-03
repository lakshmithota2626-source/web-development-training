const books = [
  { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", pages: 310, isRead: true },
  { id: 2, title: "A Wizard of Earthsea", author: "Ursula K. Le Guin", pages: 205, isRead: false },
  { id: 3, title: "The Little Prince", author: "Antoine de Saint-Exupéry", pages: 96, isRead: false }
];

let nextBookId = 4;
const bookForm = document.querySelector("#book-form");
const bookList = document.querySelector("#book-list");
const bookFilter = document.querySelector("#book-filter");
const bookSummary = document.querySelector("#book-summary");
const bookStatus = document.querySelector("#book-status");

function getFilteredBooks() {
  const filter = bookFilter.value;

  if (filter === "read") return books.filter((book) => book.isRead);
  if (filter === "unread") return books.filter((book) => !book.isRead);
  return books;
}

function renderSummary() {
  let readCount = 0;

  for (const book of books) {
    if (book.isRead) readCount += 1;
  }

  bookSummary.textContent = `${books.length} total · ${readCount} read · ${books.length - readCount} unread`;
}

function renderBooks() {
  bookList.replaceChildren();
  const visibleBooks = getFilteredBooks();

  for (const book of visibleBooks) {
    const item = document.createElement("li");
    item.className = `list-item${book.isRead ? " completed" : ""}`;

    const description = document.createElement("span");
    description.textContent = `${book.title} — ${book.author} · ${book.pages} pages`;

    const actions = document.createElement("span");
    actions.className = "list-actions";

    const toggleButton = document.createElement("button");
    toggleButton.className = "button";
    toggleButton.type = "button";
    toggleButton.dataset.bookAction = "toggle";
    toggleButton.dataset.bookId = String(book.id);
    toggleButton.textContent = book.isRead ? "Mark unread" : "Mark read";

    const removeButton = document.createElement("button");
    removeButton.className = "button";
    removeButton.type = "button";
    removeButton.dataset.bookAction = "remove";
    removeButton.dataset.bookId = String(book.id);
    removeButton.textContent = "Remove";

    actions.append(toggleButton, removeButton);
    item.append(description, actions);
    bookList.append(item);
  }

  renderSummary();
}

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(bookForm);
  const pages = Number(formData.get("pages"));

  if (!Number.isInteger(pages) || pages < 1) {
    bookStatus.textContent = "Enter a page count of at least 1.";
    bookStatus.classList.add("error");
    return;
  }

  books.push({
    id: nextBookId,
    title: String(formData.get("title")).trim(),
    author: String(formData.get("author")).trim(),
    pages,
    isRead: false
  });
  nextBookId += 1;
  bookForm.reset();
  bookFilter.value = "all";
  bookStatus.textContent = "Book added to your reading list.";
  bookStatus.classList.remove("error");
  renderBooks();
});

bookFilter.addEventListener("change", renderBooks);

bookList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-book-action]");
  if (!button) return;

  const bookId = Number(button.dataset.bookId);
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex < 0) return;

  if (button.dataset.bookAction === "toggle") {
    books[bookIndex].isRead = !books[bookIndex].isRead;
    bookStatus.textContent = "Reading status updated.";
  }

  if (button.dataset.bookAction === "remove") {
    books.splice(bookIndex, 1);
    bookStatus.textContent = "Book removed.";
  }

  renderBooks();
});

renderBooks();