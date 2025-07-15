import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBug, setNewBug] = useState({ title: '', description: '' });

  const fetchBugs = async () => {
    try {
      const res = await axios.get('http://localhost:5055/api/bugs');
      setBugs(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching bugs:', err);
    }
  };

  const createBug = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5055/api/bugs', newBug);
      setNewBug({ title: '', description: '' });
      fetchBugs();
    } catch (err) {
      console.error('Error creating bug:', err);
    }
  };

  const deleteBug = async (id) => {
    try {
      await axios.delete(`http://localhost:5055/api/bugs/${id}`);
      fetchBugs();
    } catch (err) {
      console.error('Error deleting bug:', err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5055/api/bugs/${id}/status`, { status });
      fetchBugs();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const statusColor = {
    'Open': 'bg-red-100 text-red-700',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Solved': 'bg-green-100 text-green-700'
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-800">🐞 Bug Tracker</h1>

      {/* Create Bug Form */}
      <form onSubmit={createBug} className="bg-white shadow rounded-lg p-4 mb-6 space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded"
          value={newBug.title}
          onChange={(e) => setNewBug({ ...newBug, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded"
          value={newBug.description}
          onChange={(e) => setNewBug({ ...newBug, description: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Bug
        </button>
      </form>

      {/* Bugs List */}
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : bugs.length === 0 ? (
        <p className="text-center text-gray-500">No bugs reported yet.</p>
      ) : (
        <div className="space-y-4">
          {bugs.map((bug) => (
            <div
              key={bug._id}
              className="bg-white border border-gray-200 rounded-lg shadow p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{bug.title}</h2>
                <span className={`text-sm px-2 py-1 rounded ${statusColor[bug.status]}`}>
                  {bug.status}
                </span>
              </div>
              <p className="text-gray-600">{bug.description}</p>

              {/* Controls */}
              <div className="mt-4 flex flex-wrap gap-2">
                <select
                  value={bug.status}
                  onChange={(e) => updateStatus(bug._id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Solved">Solved</option>
                </select>
                <button
                onClick={() => deleteBug(bug._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BugList;
