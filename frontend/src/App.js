import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  // Using your EC2 Public IP
  const API_URL = "http://43.205.192.184:5000/api/items";

  // 1. Fetch items from Backend
  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // 2. Run fetch on page load
  useEffect(() => {
    fetchItems();
  }, []);

  // 3. Post a new item to Backend
  const addItem = async () => {
    if (!name) return;
    try {
      await axios.post(API_URL, { name });
      setName(""); // Clear input field
      fetchItems(); // Refresh the list automatically
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  return (
    <div className="container">
      <h1>🚀 MERN Task Manager</h1>
      
      <div className="input-group">
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter task name..."
        />
        <button onClick={addItem}>Add Task</button>
      </div>
      
      <h2>Stored Tasks</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="task-item">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
