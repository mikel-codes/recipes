import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducer from "./redux/Reducer";
import { FormConnector } from "./redux/FormConnector";

const store = createStore(Reducer);

const MultiStepForm = () => {
  return (
    <Provider store={store}>
      <FormConnector />
    </Provider>
  );
};

export default MultiStepForm;
