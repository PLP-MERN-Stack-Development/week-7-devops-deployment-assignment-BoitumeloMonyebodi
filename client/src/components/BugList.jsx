import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateBug from './CreateBug';

function BugList() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBugs = () => {
    axios.get('http://localhost:5055/api/bugs')
      .then(res => {
        setBugs(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <p className="text-center">Loading bugs...</p>;
  if (bugs.length === 0) return <p className="text-center text-red-500">No bugs found.</p>;

  return (
    <div>
      <CreateBug onBugCreated={fetchBugs} />
      <ul className="space-y-4">
        {bugs.map((bug) => (
          <li key={bug._id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-blue-700">{bug.title}</h2>
              <span className={`text-sm font-medium px-2 py-1 rounded ${getStatusColor(bug.status)}`}>
                {bug.status}
              </span>
            </div>
            <p className="text-gray-700">{bug.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BugList;