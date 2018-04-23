import React, { Component } from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Resources from './components/Resources/Resources';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Nav />
          <Switch>
            <Route path="/contact" component={Contact}/>
            <Route path="/about" component={About}/>
            <Route path="/resources" component={Resources}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/" component={Home}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
