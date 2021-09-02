import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import RecipeList from "../components/RecipeList";
import RecipeDetail from "../components/RecipeDetail";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/recipes" exact component={RecipeList} />
      <Route path="/recipes/:id" exact component={RecipeDetail} />
    </Switch>
  </Router>
);