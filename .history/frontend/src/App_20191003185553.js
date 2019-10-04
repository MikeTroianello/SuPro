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
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/create' component={Create} />
        <Route path='/view' component={View} />
      </Switch>
    </Router>
  );
}

export default App;
