import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get("/api/items");
    setItems(res.data);
  };

  const addItem = async () => {
    await axios.post("/api/items", { name });
    setName("");
    fetchItems();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Docker MERN App</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter item"
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((item, i) => (
          <li key={i}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
