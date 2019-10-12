import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Nav from './components/layout/Nav'
import Home from './components/pages/Home'
import About from './components/pages/About'
import './App.css'

import ContactState from './context/contact/ContactState'

const App = () => {
  return (
    <ContactState>
      <Router>
        <Fragment>
          <Nav />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ContactState>
  );
}

export default App;
