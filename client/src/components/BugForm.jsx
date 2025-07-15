import React, { useState } from 'react';
import axios from 'axios';

function BugForm({ onBugAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5055/api/bugs', { title, description });
    setTitle('');
    setDescription('');
    onBugAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="border p-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Submit Bug
      </button>
    </form>
  );
}

export default BugForm;