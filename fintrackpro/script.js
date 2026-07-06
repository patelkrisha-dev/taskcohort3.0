// ==============================
// FinTrack Pro
// Part 1 - Core Functionality
// ==============================

// ---------- DOM Elements ----------
const form = document.getElementById("transactionForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");

const transactionList = document.getElementById("transactionList");

// ---------- Local Storage ----------
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// ---------- Currency ----------
let currencySymbol = "₹";

// ---------- Save ----------
function saveTransactions() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

// ---------- Update Summary ----------
function updateSummary() {

    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }

    });

    const balance = income - expense;

    incomeEl.textContent = currencySymbol + income.toFixed(2);

    expenseEl.textContent = currencySymbol + expense.toFixed(2);

    balanceEl.textContent = currencySymbol + balance.toFixed(2);

}

// ---------- Create Transaction Card ----------
function createTransaction(transaction) {

    const li = document.createElement("li");

    li.className = transaction.type;

    li.innerHTML = `

        <div>

            <h3>${transaction.title}</h3>

            <small>${transaction.category}</small>

        </div>

        <div>

            <strong>

            ${transaction.type === "income" ? "+" : "-"}

            ${currencySymbol}${transaction.amount}

            </strong>

            <button onclick="deleteTransaction(${transaction.id})">

                ❌

            </button>

        </div>

    `;

    transactionList.appendChild(li);

}

// ---------- Display ----------
function displayTransactions() {

    transactionList.innerHTML = "";

    transactions.forEach(createTransaction);

    updateSummary();

}

// ---------- Add ----------
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const title = titleInput.value.trim();

    const amount = Number(amountInput.value);

    const type = typeInput.value;

    const category = categoryInput.value;

    if (title === "" || amount <= 0) {

        alert("Please enter valid data.");

        return;

    }

    const transaction = {

        id: Date.now(),

        title,

        amount,

        type,

        category

    };

    transactions.push(transaction);

    saveTransactions();

    displayTransactions();

    form.reset();

});

// ---------- Delete ----------
function deleteTransaction(id) {

    const confirmDelete = confirm(
        "Delete this transaction?"
    );

    if (!confirmDelete) return;

    transactions = transactions.filter((item) => {

        return item.id !== id;

    });

    saveTransactions();

    displayTransactions();

}

// ---------- Initial Load ----------
displayTransactions();