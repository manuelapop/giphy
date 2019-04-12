import React from "react";
import Header from "./components/navigationBar/NavigationBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/home";
import SearchComponent from "./components/search/searchcomponent";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <div className="container-fluid" styles="margin-top:5px;">
          <Route path="/" exact component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/searchcomponent" component={SearchComponent} />
          <Route path="/search/:query" component={SearchComponent} />
        </div>
      </div>
    </Router>
  );
};
export default App;
