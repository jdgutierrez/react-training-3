import React from 'react';
import { 
  BrowserRouter, 
  Link, 
  Switch, 
  Route, 
  Prompt,
} from 'react-router-dom';
import ContactRouter from './contactRouter';

import './App.scss';

function Home () {
  return <div style={{backgroundColor: 'yellow'}}>Home</div>;
}

function About () {
  return <div>About</div>;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
        <Prompt 
          message={(location) => {
            return location.pathname.includes('contact') ? true : "Are you sure to exit this page?";
          }}
        />
        <Switch>
          <Route exact path={["/home", "/"]}>
            <Home/>
          </Route>
          <Route path="/home/new">
            New home
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/contact">
            <ContactRouter />
          </Route>
          <Route>
            Default page
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
