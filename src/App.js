import React from 'react';
import './App.scss';
import Header from './Header/Header'
import Pomodoro from './Pomodoro/Pomodoro'

function App() {
  return (
    <div className="App">
      <Header nombreProyecto="Pomodoro Clock"/>
      <Pomodoro />
    </div>
  );
}

export default App;
