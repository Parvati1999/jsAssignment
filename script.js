let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function showExpenses() {
  const list = document.getElementById("expenseList");
  const totalSpan = document.getElementById("totalAmount");
  list.innerHTML = "";
  let total = 0;

  expenses.forEach((item, index) => {
    total += Number(item.amount);

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.desc}</strong> - ₹${item.amount}
      <button onclick="editExpense(${index})">Edit</button>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    list.appendChild(li);
  });

  totalSpan.textContent = total;
}

function addExpense() {
  const desc = document.getElementById("descInput").value;
  const amount = document.getElementById("amountInput").value;

  if (desc === "" || amount === "") {
    alert("Please enter both description and amount.");
    return;
  }

  expenses.push({ desc: desc, amount: amount });
  saveExpenses();
  showExpenses();

  document.getElementById("descInput").value = "";
  document.getElementById("amountInput").value = "";
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveExpenses();
  showExpenses();
}

function editExpense(index) {
  const newDesc = prompt("Edit description:", expenses[index].desc);
  const newAmount = prompt("Edit amount:", expenses[index].amount);

  if (newDesc !== null && newAmount !== null && newDesc.trim() !== "" && newAmount.trim() !== "") {
    expenses[index].desc = newDesc.trim();
    expenses[index].amount = newAmount.trim();
    saveExpenses();
    showExpenses();
  }
}

showExpenses();
