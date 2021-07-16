import React, { Component } from "react";
const NUMBER_OF_STEPS = 4;
const _ = require("lodash");

export default class ProgressBar extends Component {
  // Functions
  // ----------------------------------------------
  isActiveStep(bubbleNumber) {
    // Get state
    const step = this.props.step;
    return step >= bubbleNumber ? "active" : "";
  }

  getPercentageCompleted(stepPercentageNumber) {
    // Get state
    const step = this.props.step;
    const stepCompletionPercentage = this.props.stepCompletionPercentage;

    if (stepPercentageNumber < step) {
      return 100;
    }
    if (stepPercentageNumber === step) {
      return stepCompletionPercentage;
    }
    if (stepPercentageNumber > step) {
      return 0;
    }
  }

  // ----------------------------------------------
  // Render
  // ----------------------------------------------
  render() {
    // Get functions
    const isActiveStep = this.isActiveStep.bind(this);
    const getPercentageCompleted = this.getPercentageCompleted.bind(this);

    return (
      <div id="progress-bar-wrap">
        {/* PROGRESS BAR */}
        <div id="progress-bar">7</div>

        {/* BUBBLES */}
        <div className="bubble-wrap">
          {_.times(NUMBER_OF_STEPS, (index) => {
            const stepNumber = index + 1;

            return (
              <div
                key={stepNumber}
                id={`bubble-${stepNumber}`}
                className={`bubble ${isActiveStep(stepNumber)}`}
              >
                8
              </div>
            );
          })}
        </div>

        {/* STEP PERCENTAGES */}
        <div className="step-percentage-wrap">
          {_.times(NUMBER_OF_STEPS - 1, (index) => {
            const stepNumber = index + 1;

            return (
              <div
                key={stepNumber}
                id={`step-percentage-${stepNumber}`}
                className="step-percentage"
                style={{ width: `${getPercentageCompleted(stepNumber)}%` }}
              ></div>
            );
          })}
        </div>
      </div>
    );
  }
}
