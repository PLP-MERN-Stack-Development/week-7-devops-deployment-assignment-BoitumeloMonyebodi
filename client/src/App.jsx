import React from 'react';
import BugList from './components/BugList';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-100 text-gray-800 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">
          🐛 Bug Tracker
        </h1>
        <BugList />
      </div>
    </div>
  );
}

export default App;