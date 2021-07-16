import React from "react";
import { Switch, Route } from "react-router-dom";

import { Recipes } from "./Recipes";
import Recipe from "./Recipe";
import Home from "./Home";
import NewRecipe from "./forms/NewRecipe";

const App = (props) => {
  /*
  useEffect(() => {
    console.log(location);
    if (location.pathname === "/recipes") {
      setDetail("hide");
    } else setDetail("view");
    return () => {
      console.log("changed location pathname");
    };
  }, [location]);
  const handleClick = (ev) => {
    if (detail === "view") history.push("/recipes");
    else history.push("/");
  };
  */
  return (
    <div className="container">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route
          path="/recipes"
          exact={true}
          render={(routeProps) => (
            <div className="main clearfix">
              <div className="container">
                <Recipes {...routeProps} {...props} />
              </div>
            </div>
          )}
        />
        <Route
          path="/recipe/:id"
          exact={true}
          render={(routeProps) => <Recipe {...routeProps} {...props} />}
        />
        <Route
          path="/recipe"
          exact={true}
          render={(routeProps) => <NewRecipe {...routeProps} {...props} />}
        />
      </Switch>
    </div>
  );
};

export default App;
