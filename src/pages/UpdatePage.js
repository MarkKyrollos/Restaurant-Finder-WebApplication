import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', location: '', price_range: 1 });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/restaurants/${id}`)
      .then(res => setForm(res.data.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/restaurants/${id}`, form)
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Update Restaurant</h1>
      <form onSubmit={handleSubmit}>
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
        <input type="number" min="1" max="5" value={form.price_range}
               onChange={e => setForm({ ...form, price_range: e.target.value })} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdatePage;
