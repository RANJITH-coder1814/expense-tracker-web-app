import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expenses");
    setExpenses(res.data);
  };

  const addExpense = async () => {
    await axios.post("http://localhost:5000/api/expenses", {
      title,
      amount,
      category: "General",
    });
    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    await axios.delete(`http://localhost:5000/api/expenses/${id}`);
    fetchExpenses();
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Amount"
        type="number"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={addExpense}>Add</button>

      <ul>
        {expenses.map((exp) => (
          <li key={exp._id}>
            {exp.title} - ₹{exp.amount}
            <button onClick={() => deleteExpense(exp._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
