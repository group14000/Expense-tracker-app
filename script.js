document.addEventListener("DOMContentLoaded", function() {
    const addExpenseButton = document.getElementById("add-expense");
    const expenseList = document.getElementById("expense-list");

    addExpenseButton.addEventListener("click", function() {
        const expenseAmount = document.getElementById("expense-amount").value;
        const expenseDescription = document.getElementById("expense-description").value;
        const expenseCategory = document.getElementById("expense-category").value;

        if (expenseAmount && expenseDescription && expenseCategory) {
            const expenseItem = document.createElement("div");
            expenseItem.classList.add("expense-item");
            expenseItem.innerHTML = `
                <p>Choose Expense Amount: ${expenseAmount}</p>
                <p>Choose Description: ${expenseDescription}</p>
                <p>Choose a Category: ${expenseCategory}</p>
                <div class="expense-item-buttons">
                    <button class="delete-expense">Delete Expense</button>
                    <button class="edit-expense">Edit Expense</button>
                </div>
            `;

            expenseList.appendChild(expenseItem);
            updateLocalStorage();
        }
    });

    expenseList.addEventListener("click", function(event) {
        const target = event.target;
        if (target.classList.contains("delete-expense")) {
            target.closest(".expense-item").remove();
            updateLocalStorage();
        }
    });

    function updateLocalStorage() {
        const expenses = [];
        document.querySelectorAll(".expense-item").forEach(expenseItem => {
            const expenseData = {
                amount: expenseItem.querySelector("p:nth-child(1)").textContent.split(": ")[1],
                description: expenseItem.querySelector("p:nth-child(2)").textContent.split(": ")[1],
                category: expenseItem.querySelector("p:nth-child(3)").textContent.split(": ")[1]
            };
            expenses.push(expenseData);
        });
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function loadExpensesFromLocalStorage() {
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.forEach(expense => {
            const expenseItem = document.createElement("div");
            expenseItem.classList.add("expense-item");
            expenseItem.innerHTML = `
                <p>Choose Expense Amount: ${expense.amount}</p>
                <p>Choose Description: ${expense.description}</p>
                <p>Choose a Category: ${expense.category}</p>
                <div class="expense-item-buttons">
                    <button class="delete-expense">Delete Expense</button>
                    <button class="edit-expense">Edit Expense</button>
                </div>
            `;
            expenseList.appendChild(expenseItem);
        });
    }

    loadExpensesFromLocalStorage();
});
