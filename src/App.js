import React from 'react';
import './App.css';
import Quiz from './components/Quiz';

function App() {
  return (
    <div className="flex flex-col items-center gap-4 justify-center min-h-screen bg-gray-100 p-4">
      <header className="text-center ">
        <h1 className="text-6xl font-bold">Quiz App</h1>
      </header>
      
        <Quiz />
      
    </div>
  );
}

export default App;
