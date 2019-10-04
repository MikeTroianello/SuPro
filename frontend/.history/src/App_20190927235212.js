import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Home from './components/Homed';

import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <h1>FRONTEND</h1>
        <h2>YEET</h2>
      </div>
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
