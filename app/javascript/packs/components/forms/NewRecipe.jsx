import React, { Component } from "react";
import ValidatedForm from "./ValidatedForm";
import MultiStepForm from "../stepform/MultiStepForm";

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.defaultAttrs = { type: "text", required: true };
    this.formModel = [
      { label: "Name" },
      { label: "Ingredients" },
      { label: "Instruction" },
    ];
  }

  cancelCallback = () => {
    this.props.history.push("/recipes");
  };

  submitCallback = (data) => {
    const url = "/api/v1/recipes/create";
    const { name, ingredients, instruction } = data;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("errors occurred as we could not load page");
      })
      .then((data) => this.props.history.push(`/recipe/${data.id}`))
      .catch((ex) => {
        console.error(ex.message);
        return;
      });
  };

  render() {
    return (
      <div class="container">
        <header>
          <MultiStepForm />
          <ValidatedForm
            formModel={this.formModel}
            defaultAttrs={this.defaultAttrs}
            submitText="Save Recipe"
            cancelText="Return To Recipes"
          />
        </header>
      </div>
    );
  }
}

export default NewRecipe;
