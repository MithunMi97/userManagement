import React from 'react';
import './style.css';
import {Route,BrowserRouter,Switch } from 'react-router-dom';
import UserDetails from './Components/userDashboard';
import Header from './Components/header';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path="/Users" component={UserDetails} />
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
