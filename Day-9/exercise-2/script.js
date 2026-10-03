function summarizeBudget(income, expenses) {
  const expenseTotal = Object.values(expenses).reduce((total, amount) => total + amount, 0);
  const remaining = income - expenseTotal;
  const savingsRate = (remaining / income) * 100;
  let status;

  if (remaining < 0) {
    status = "Over budget";
  } else if (savingsRate >= 20) {
    status = "On track";
  } else {
    status = "Review spending";
  }

  return { expenseTotal, remaining, savingsRate, status };
}

const budgetForm = document.querySelector("#budget-form");
const budgetOutput = document.querySelector("#budget-output");
const budgetStatus = document.querySelector("#budget-status");

budgetForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(budgetForm);
  const income = Number(formData.get("income"));
  const expenses = {
    housing: Number(formData.get("housing")),
    food: Number(formData.get("food")),
    transport: Number(formData.get("transport")),
    other: Number(formData.get("other"))
  };

  if (!Number.isFinite(income) || income <= 0 || Object.values(expenses).some((amount) => !Number.isFinite(amount) || amount < 0)) {
    budgetStatus.textContent = "Enter a positive income and non-negative expenses.";
    budgetStatus.classList.add("error");
    return;
  }

  const summary = summarizeBudget(income, expenses);
  const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  budgetOutput.textContent = [
    `Income: ${currency.format(income)}`,
    `Expenses: ${currency.format(summary.expenseTotal)}`,
    `Remaining: ${currency.format(summary.remaining)}`,
    `Savings rate: ${summary.savingsRate.toFixed(1)}%`,
    `Status: ${summary.status}`
  ].join("\n");
  budgetStatus.textContent = "Budget summary calculated.";
  budgetStatus.classList.remove("error");
});