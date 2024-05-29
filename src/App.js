import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/index.js';
import Maps from './pages/Maps.js';
import About from './pages/About.js';

  
function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
          <Route path="/home"> <Home /> </Route>
          <Route path="/carte"> <Maps /> </Route>
          <Route path="/infos"> <About /> </Route>
      </Switch>
    </Router>
  );
}
  
export default App;