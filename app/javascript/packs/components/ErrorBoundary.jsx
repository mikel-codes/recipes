import React, { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  state = {
    error: "",
    info: "",
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { error, hasError: true };
  }
  componentDidCatch(error, info) {
    console.log({ error, info });
    this.setState({ info });
  }

  render() {
    const { hasError, info, error } = this.state;
    if (hasError) {
      return (
        <div className="container" style={{ color: "black" }}>
          <div className="column">
            <header>
              <h1>Error Occured while loading this page</h1>
            </header>
            <button
              className="errorbtn"
              onClick={() => window.location.reload()}
            >
              Reload!
            </button>
            <p>{error && error.message}</p>
            <details>
              <summary>Click for more details</summary>
              {info && info.componentStack.toString()}
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
export default ErrorBoundary;
