import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();

  const getRecipeList = () => {
    const url = '/api/v1/recipes/index';
    axios.get(url)
      .then((res) => {
        setRecipes(res.data);
      })
      .catch(() => {
        history.push("/")
      });
  };

  useEffect(() => {
    getRecipeList();
  }, []);

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Recipes for every occasion</h1>
          <p className="lead text-muted">
            We've pulled together our most popular recipes, our latest
            additions, and our editor's picks, so there's sure to be something
            tempting for you to try.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="d-flex flex-row-reverse text-right mb-3">
            <Link to="/recipes/create">
              <Button variant="dark" size="lg">Create New Recipe</Button>
            </Link>
          </div>
          <div className="row">
            { recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <div key={index} className="col-4 mb-4">
                  <Card>
                    <Card.Img variant="top" src={recipe.image} />
                    <Card.Body>
                      <Card.Title>{ recipe.name }</Card.Title>
                      <Link to={`/recipes/${recipe.id}`}>
                        <Button variant="dark">View Recipe</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
                <h4>
                  No recipes yet. Why not <Link to="/recipes/create">create one</Link>
                </h4>
              </div>
            ) }
          </div>
          <div className="mt-5 d-flex justify-content-center">
            <Link to="/">
              <Button variant="dark" size="lg">Home</Button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export default Recipes;
