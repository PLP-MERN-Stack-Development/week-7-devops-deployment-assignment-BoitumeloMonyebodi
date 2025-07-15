import React, { useState } from 'react';
import BugForm from '../components/BugForm';
import BugList from '../components/BugList';

function Home() {
  const [reload, setReload] = useState(false);

  const handleBugAdded = () => {
    setReload(!reload);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">MERN Bug Tracker</h1>
      <BugForm onBugAdded={handleBugAdded} />
      <BugList key={reload} />
    </div>
  );
}

export default Home;