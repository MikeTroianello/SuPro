import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Home from './components/Homedd';

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
        <Route path='/Signup' component={Signup} />
        <Route path='/Home' component={Home} />
        <Route path='/Home' component={Home} />
        <Route path='/Home' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
