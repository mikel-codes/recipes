import React, { Component } from "react";
import ProgressBar from "./ProgressBar";
const NUMBER_OF_STEPS = 4;
export default class AppForm extends Component {
  render() {
    // Get states
    const step = this.props.step;
    const stepCompletionPercentage = this.props.stepCompletionPercentage;

    // Get actions
    const changeStep = this.props.ChangeStep.bind(this);
    const changePercentage = this.props.ChangePercentage.bind(this);

    return (
      <div>
        {/* PROGRESS */}
        <ProgressBar
          step={step}
          stepCompletionPercentage={stepCompletionPercentage}
        />

        {/* buttonS */}
        <div className="buttons">
          <button
            className="step-button first-step-button"
            disabled={step <= 1}
            onClick={() => changeStep(-NUMBER_OF_STEPS)}
            type="primary"
          >
            First
          </button>
          <button
            className="step-button previous-step-button"
            disabled={step <= 1}
            onClick={() => changeStep(-1)}
            type="primary"
          >
            Prev
          </button>
          <button
            className="step-button next-step-button"
            disabled={step >= NUMBER_OF_STEPS}
            onClick={() => changeStep(1)}
            type="primary"
          >
            Next
          </button>
          <button
            className="step-button last-step-button"
            disabled={step >= NUMBER_OF_STEPS}
            onClick={() => changeStep(NUMBER_OF_STEPS)}
            type="primary"
          >
            Last
          </button>
        </div>

        {/* SLIDER */}
        <div className="slider-wrap">
          <input
            type="range"
            className={step === NUMBER_OF_STEPS ? "hidden" : ""}
            onChange={changePercentage}
            step="25"
            value={stepCompletionPercentage}
          />
        </div>
      </div>
    );
  }
}
