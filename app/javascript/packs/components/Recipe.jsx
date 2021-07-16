import React, { Component } from "react";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: { ingredients: "" },
    };
    this.addHtmlEntities = this.addHtmlEntities.bind(this);
  }
  componentDidMount = () => {
    console.log("component props => ", this.props);
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const url = `/api/v1/show/${id}`;
    fetch(url)
      .then((response) => {
        console.error(response);
        if (response.ok) return response.json();
        throw new Error("could not fetch meals");
      })
      .then((data) => {
        this.setState((state) => (state.recipe = data));
      })
      .catch((err) => {
        console.error(err.message);
        this.props.history.push("/recipes");
      });
  };

  addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  render() {
    const { recipe } = this.state;
    console.log("Recipe => ", recipe.ingredients);
    let ingredientsList = "no ingredient available";
    if (recipe.ingredients.length > 0) {
      ingredientsList = String(recipe.ingredients)
        .split(",")
        .map((ingredient, index) => (
          <li key={index} className="">
            {ingredient}
          </li>
        ));
    }
    const recipeInstruction = this.addHtmlEntities(recipe.instruction);
    console.log("Instruction ", recipe.instruction);
    return (
      <React.Fragment>
        <header style={{ backgroundImage: `${recipe.image}` }}>
          <img src={recipe.image} style={{ width: "10em", height: "10em" }} />
          <h1 style={{ color: "#e1e1e1" }}>{recipe.name}</h1>
        </header>
        <div className="main clearfix" style={{ color: "black" }}>
          <div className="column">
            <ul>
              <h1>Ingredients</h1>
              {ingredientsList}
            </ul>
          </div>
          <div className="column">
            <h1>Instructions</h1>
            <div dangerouslySetInnerHTML={{ __html: `${recipeInstruction}` }} />
            <span>
              <button
                className="button"
                style={{ backgroundColor: "indianred" }}
              >
                delete
              </button>
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Recipe;
