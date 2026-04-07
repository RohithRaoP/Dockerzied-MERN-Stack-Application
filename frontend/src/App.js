import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  // Replace 13.23.xx.xx with your EC2 Public IP
  const API_URL = "http://43.205.192.184:5000/api/items";

  // Fetch items from Backend
  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Post a new item to Backend
  const addItem = async () => {
    if (!name) return;
    await axios.post(API_URL, { name });
    setName("");
    fetchItems();
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Docker MERN App 🚀</h1>
      
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter item name"
        style={{ padding: "10px", marginRight: "10px" }}
      />
      <button onClick={addItem} style={{ padding: "10px 20px" }}>Add Item</button>

      <h3>Items from MongoDB:</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
