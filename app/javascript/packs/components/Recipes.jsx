import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "../../../assets/stylesheets/cards.scss";
import "../../../assets/stylesheets/loader.scss";

export const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loader, setLoader] = useState(true);
  const history = useHistory();
  useEffect(() => {
    fetch("/api/v1/recipes/index")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("could not fetch meals");
      })
      .then((data) => {
        setTimeout(() => {
          setLoader(false);
          setRecipes(data);
        }, 1000);
      })
      .catch(() => history.push("/"));
  }, [history]);

  return loader ? (
    <div className="loader"></div>
  ) : (
    <React.Fragment>
      <div className="main clearfix">
        <Link to="/recipe" className="button">
          New Recipe
        </Link>
        <h2 style={{ color: "black" }}>showing {recipes.length} Recipes </h2>
      </div>
      <section className="card-row">
        {recipes.length > 0 ? (
          recipes.map((r, i) => (
            <article className="card" key={i}>
              <img src={r.image} alt={`${r.name} image`} />
              <h3>{r.name}</h3>
              <p>{r.ingredients}</p>
              <Link to={`/recipe/${r.id}`} className="button">
                see the recipe
              </Link>
            </article>
          ))
        ) : (
          <h1>Now Recipe</h1>
        )}
      </section>
    </React.Fragment>
  );
};
