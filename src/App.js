import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './components/screens/Home';

function App()
{
  return (
    <Router>
      <Switch>
        <Route path="/:postcode" children={<Home />} />
        <Route path="/" children={<Home />} />
      </Switch>
    </Router>
  );
}

export default App;
