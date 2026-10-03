function calculateTip(bill, percent) {
  const tip = bill * (percent / 100);
  return { tip, total: bill + tip };
}

function gradeForScore(score) {
  if (!Number.isInteger(score) || score < 0 || score > 100) return null;
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function multiplesOfThree(limit) {
  const values = [];
  for (let number = 1; number <= limit; number++) {
    if (number % 3 === 0) values.push(number);
  }
  return values;
}

function analyzeScores(input) {
  const scores = input.split(",").map((value) => Number(value.trim()));
  if (scores.length === 0 || scores.some((score) => !Number.isFinite(score) || score < 0 || score > 100)) {
    return null;
  }
  const passingScores = scores.filter((score) => score >= 60);
  const average = passingScores.length === 0
    ? 0
    : passingScores.reduce((total, score) => total + score, 0) / passingScores.length;
  return { passingScores, average };
}

const billAmount = document.querySelector("#billAmount");
const tipPercent = document.querySelector("#tipPercent");
const tipOutput = document.querySelector("#tipOutput");

document.querySelector("#calculateTip").addEventListener("click", () => {
  const bill = Number(billAmount.value);
  const percent = Number(tipPercent.value);
  if (!Number.isFinite(bill) || bill < 0 || !Number.isFinite(percent) || percent < 0 || percent > 100) {
    tipOutput.textContent = "Enter a non-negative bill and a tip from 0 to 100 percent.";
    return;
  }
  const result = calculateTip(bill, percent);
  tipOutput.textContent = `Tip: $${result.tip.toFixed(2)} | Total: $${result.total.toFixed(2)}`;
});

document.querySelector("#classifyScore").addEventListener("click", () => {
  const score = Number(document.querySelector("#scoreValue").value);
  const grade = gradeForScore(score);
  document.querySelector("#gradeOutput").textContent = grade === null
    ? "Enter a whole-number score from 0 to 100."
    : `Grade: ${grade}`;
});

document.querySelector("#listMultiples").addEventListener("click", () => {
  const limit = Number(document.querySelector("#loopLimit").value);
  const output = document.querySelector("#multiplesOutput");
  if (!Number.isInteger(limit) || limit < 1 || limit > 30) {
    output.textContent = "Enter a whole-number limit from 1 to 30.";
    return;
  }
  output.textContent = multiplesOfThree(limit).join(", ") || "No multiples of 3 in this range.";
});

document.querySelector("#analyzeScores").addEventListener("click", () => {
  const result = analyzeScores(document.querySelector("#scoreList").value);
  document.querySelector("#scoresOutput").textContent = result === null
    ? "Enter comma-separated scores from 0 to 100."
    : `Passing: ${result.passingScores.join(", ") || "none"} | Average: ${result.average.toFixed(1)}`;
});

const readingForm = document.querySelector("#readingForm");
const readingList = document.querySelector("#readingList");
const books = [
  { id: 1, title: "JavaScript Basics", pages: 120 },
  { id: 2, title: "DOM Notes", pages: 84 }
];
let nextBookId = 3;

function renderBooks() {
  readingList.replaceChildren();
  for (const book of books) {
    const row = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = `${book.title} - ${book.pages} pages`;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.dataset.removeBook = String(book.id);
    removeButton.textContent = "Remove";
    removeButton.setAttribute("aria-label", `Remove ${book.title}`);

    row.append(text, removeButton);
    readingList.append(row);
  }
}

readingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#bookTitle").value.trim();
  const pages = Number(document.querySelector("#bookPages").value);
  const status = document.querySelector("#readingStatus");
  if (!title || !Number.isInteger(pages) || pages < 1) {
    status.textContent = "Enter a title and a whole-number page count above zero.";
    return;
  }
  books.push({ id: nextBookId, title, pages });
  nextBookId += 1;
  readingForm.reset();
  status.textContent = "Book added.";
  renderBooks();
});

readingList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-remove-book]");
  if (!button) return;
  const bookId = Number(button.dataset.removeBook);
  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) books.splice(index, 1);
  document.querySelector("#readingStatus").textContent = "Book removed.";
  renderBooks();
});

renderBooks();