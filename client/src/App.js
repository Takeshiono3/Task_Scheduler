
import './App.css';
import { useState } from "react";
import Axios from "axios";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import notes from "./pages/notes";
import home from "./pages/home";

function App() {

  return (
    
  <div>
    <Router>
      <Switch>
        <Route path="/home" exact component={home} />
        <Route path="/notes" exact component={notes} />
      </Switch>
    </Router>
    <a href="./home">Begin your task scheduling experience</a>
  </div>

  );
 
}

export default App;
