import React from 'react';
import './App.css';
import Hangman from './components';

const App: React.FC = () => {
  return (
    <div className="c-container">
      <Hangman />
    </div>
  );
}

export default App;
