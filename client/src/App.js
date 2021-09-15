import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import notes from "./pages/notes";
import Home from "./pages/Home";
import Statistics from "./pages/chart";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/notes" exact component={notes} />
          <Route path="/Statistics" exact component={Statistics}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;