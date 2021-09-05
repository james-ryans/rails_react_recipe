import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Image, Button, ListGroup } from "react-bootstrap";
import axios from "axios";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const history = useHistory();

  const getRecipeById = (id) => {
    const url = `/api/v1/recipes/${id}`;
    axios.get(url)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch(() => {
        history.push("/recipes");
      });
  };

  const deleteRecipeById = (id) => {
    const url = `/api/v1/recipes/${id}`

    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    axios.delete(url)
      .then(() => {
        history.push("/recipes");
      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    getRecipeById(id);
  }, []);

  return (
    <>
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <img
          src={recipe?.image}
          alt={`${recipe?.name} image`}
          className="img-fluid position-absolute"
        />
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {recipe?.name}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <ListGroup>
              <h5 className="mb-2">Ingredients</h5>
              { recipe?.ingredients
                  .split(",")
                  .map((ingredient, index) => (
                    <ListGroup.Item key={index}>
                      {ingredient.trim()}
                    </ListGroup.Item>
                  ))
              }
            </ListGroup>
          </div>
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Preparation Instructions</h5>
            <p>{recipe?.instruction}</p>
          </div>
          <div className="col-sm-12 col-lg-2">
            <Button variant="danger" onClick={() => {deleteRecipeById(id)}}>Delete Recipe</Button>
          </div>
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <Link to="/recipes">
            <Button variant="dark" size="lg">Back to recipes</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Recipe;