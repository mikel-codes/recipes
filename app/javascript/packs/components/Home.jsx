import React from "react";
import { useHistory } from "react-router-dom";
import Image from "images/recipe.jpeg";
const Home = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/recipes");
  };
  return (
    <div className="container">
      <img src={Image} className="photo" />
      <header
        style={{
          height: "100vh",
          textAlign: "center",
          paddingTop: "18%",
        }}
      >
        <h1>
          Food Recipes
          <span className="note">most desired meal website</span>
        </h1>
        <button className="view" onClick={handleClick}>
          View Recipes
        </button>
      </header>
    </div>
  );
};
export default Home;
