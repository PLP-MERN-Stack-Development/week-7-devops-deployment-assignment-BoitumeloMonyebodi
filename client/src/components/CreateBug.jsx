import React, { useState } from 'react';
import axios from 'axios';

function CreateBug({ onBugCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Open');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5055/api/bugs', {
        title,
        description,
        status
      });
      onBugCreated(res.data);
      setTitle('');
      setDescription('');
      setStatus('Open');
    } catch (err) {
      console.error('Failed to create bug:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Create a New Bug</h2>
      <input
        type="text"
        className="w-full border border-gray-300 p-2 rounded"
        placeholder="Bug Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full border border-gray-300 p-2 rounded"
        placeholder="Bug Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select
        className="w-full border border-gray-300 p-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Open</option>
        <option>In Progress</option>
        <option>Resolved</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Submit Bug
      </button>
    </form>
  );
}

export default CreateBug;