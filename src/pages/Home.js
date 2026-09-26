import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState({ name: '', location: '', price_range: 1 });

  useEffect(() => {
    axios.get('http://localhost:5000/api/restaurants')
      .then(res => setRestaurants(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/restaurants', form)
      .then(res => setRestaurants([...restaurants, res.data.data]))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/restaurants/${id}`)
      .then(() => setRestaurants(restaurants.filter(r => r.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Restaurant Finder</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Location" onChange={e => setForm({ ...form, location: e.target.value })} />
        <input type="number" min="1" max="5" onChange={e => setForm({ ...form, price_range: e.target.value })} />
        <button type="submit">Add</button>
      </form>

      <ul>
        {restaurants.map(r => (
          <li key={r.id}>
            {r.name} - {r.location} - {"$".repeat(r.price_range)}
            <button onClick={() => handleDelete(r.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
