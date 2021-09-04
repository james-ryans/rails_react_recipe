import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const RecipeCreate = () => {
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(64, 'Too Long!').required('Required'),
    ingredients: Yup.string().max(1024, 'Too Long!').required('Required'),
    instruction: Yup.string().max(1024, 'Too Long!').required('Required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const url = "/api/v1/recipes";

    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token

    axios.post(url, values)
      .then((res) => {
        history.push(`/recipes/${res.id}`)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 mx-auto">
          <h1 className="font-weight-normal mb-5">
            Add a new recipe to our awesome recipe collection.
          </h1>
          <Formik
            initialValues={{
              name: '',
              ingredients: '',
              instruction: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group mb-2">
                  <label htmlFor="name" className="form-label">Recipe Name</label>
                  <Field id="name" name="name" className="form-control" />
                  <ErrorMessage name="name" component="small" className="text-danger" />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="ingredients" className="form-label">Ingredients</label>
                  <Field id="ingredients" name="ingredients" className="form-control" />
                  <small id="ingredientsHelp" className="form-text text-muted d-block">
                    Separate each ingredient with a comma.
                  </small>
                  <ErrorMessage name="ingredients" component="small" className="text-danger" />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="instruction" className="form-label">Preparation Instructions</label>
                  <Field as="textarea" id="instruction" name="instruction" className="form-control" />
                  <ErrorMessage name="instruction" component="small" className="text-danger" />
                </div>
                <Button type="submit" variant="dark" disabled={isSubmitting}>Submit</Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RecipeCreate;