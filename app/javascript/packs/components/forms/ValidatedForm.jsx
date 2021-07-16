import React, { Component } from "react";
import { GetMessages } from "./GetMessages";
import { ValidationErrors } from "./ValidationErrors";

class ValidatedForm extends Component {
  constructor(props) {
    super(props);
    this.state = { validationErrors: {} };
    this.formElements = {};
  }
  handleSubmit = () => {
    this.setState((state) => {
      const newState = { ...state, validationErrors: {} };
      Object.keys(this.formElements).forEach((elem) => {
        if (!elem.checkValidity) {
          newState.validationErrors[elem.name] = GetMessages(elem);
        }
        return newState;
      }),
        () => {
          if (Object.keys(this.state.validationErrors).length === 0) {
            const data = Object.assign(
              ...Object.entries(this.formElements)
            ).map((e) => ({ [e[0]]: e[1].value }));
            this.props.submitCallback(data);
          }
        };
    });
  };
  registerRef = (elem) => {
    if (elem !== null) return (this.formElements[elem.name] = elem);
  };
  renderElements = (modelItem) => {
    const name = modelItem.name || modelItem.label.toLowerCase();
    return (
      <div className="form-group" key={modelItem.label}>
        <label>{modelItem.label}</label>
        <ValidationErrors errors={this.state.validationErrors[name]} />
        <input
          className="form-control"
          name={name}
          ref={this.registerRef}
          {...this.props.defaultAttrs}
          {...modelItem.attrs}
        />
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.props.formModel.map((m) => this.renderElements(m))}
        <div className="text-center">
          <button
            className="btn btn-secondary "
            onClick={this.props.cancelCallback}
          >
            {this.props.cancelText || "Cancel"}
          </button>
          <button className="btn btn-primary" onClick={this.handleSubmit}>
            {this.props.submitText || "Submit"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}
export default ValidatedForm;
