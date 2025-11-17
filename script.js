let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
    let income = 0, expense = 0;

    const list = document.getElementById("list");
    list.innerHTML = "";

    transactions.forEach((t, index) => {

        if (t.type === "income") income += t.amount;
        else expense += t.amount;

        const li = document.createElement("li");
        li.innerHTML = `
            <span>
                ₹${t.amount} • ${t.category} • ${t.date}
                <br>
                <small>${t.note}</small>
            </span>
            <button class="del-btn" onclick="deleteTransaction(${index})">X</button>
        `;
        list.appendChild(li);
    });

    document.getElementById("income").innerText = "₹" + income;
    document.getElementById("expense").innerText = "₹" + expense;
    document.getElementById("balance").innerText = "₹" + (income - expense);

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const note = document.getElementById("note").value;

    if (!amount || !category || !date) {
        alert("Please fill all required fields");
        return;
    }

    const transaction = { amount, type, category, date, note };
    transactions.push(transaction);

    updateUI();

    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("date").value = "";
    document.getElementById("note").value = "";
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

updateUI();