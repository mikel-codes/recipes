const { createStore, bindActionCreators } = Redux;
const { Provider, connect } = ReactRedux;
const { render } = ReactDOM;
const { Button, Slider } = antd;

// Definitions
const NUMBER_OF_STEPS = 4;

// Component States
const defaultState = {
  step: 1,
  stepCompletionPercentage: 0,
};

// ============================================================================
// COMPONENT: App
// ============================================================================
class App extends React.Component {
  // ----------------------------------------------
  // Render
  // ----------------------------------------------
  render() {
    // Get states
    const step = this.props.step;
    const stepCompletionPercentage = this.props.stepCompletionPercentage;

    // Get actions
    const changeStep = this.props.changeStep.bind(this);
    const changePercentage = this.props.changePercentage.bind(this);

    return (
      <div>
        {/* PROGRESS */}
        <ProgressBar
          step={step}
          stepCompletionPercentage={stepCompletionPercentage}
        />

        {/* BUTTONS */}
        <div className="buttons">
          <Button
            className="step-button first-step-button"
            disabled={step <= 1}
            onClick={() => changeStep(-NUMBER_OF_STEPS)}
            type="primary"
          >
            First
          </Button>
          <Button
            className="step-button previous-step-button"
            disabled={step <= 1}
            onClick={() => changeStep(-1)}
            type="primary"
          >
            Prev
          </Button>
          <Button
            className="step-button next-step-button"
            disabled={step >= NUMBER_OF_STEPS}
            onClick={() => changeStep(1)}
            type="primary"
          >
            Next
          </Button>
          <Button
            className="step-button last-step-button"
            disabled={step >= NUMBER_OF_STEPS}
            onClick={() => changeStep(NUMBER_OF_STEPS)}
            type="primary"
          >
            Last
          </Button>
        </div>

        {/* SLIDER */}
        <div className="slider-wrap">
          <Slider
            className={step === NUMBER_OF_STEPS ? "hidden" : ""}
            onChange={changePercentage}
            step="25"
            value={stepCompletionPercentage}
          ></Slider>
        </div>
      </div>
    );
  }
}

// ============================================================================
// COMPONENT: ProgressBar
// ============================================================================
class ProgressBar extends React.Component {
  // ----------------------------------------------
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
        <div id="progress-bar"></div>

        {/* BUBBLES */}
        <div className="bubble-wrap">
          {_.times(NUMBER_OF_STEPS, (index) => {
            const stepNumber = index + 1;

            return (
              <div
                key={stepNumber}
                id={`bubble-${stepNumber}`}
                className={`bubble ${isActiveStep(stepNumber)}`}
              ></div>
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

// ============================================================================
// Reducers
// ============================================================================
function reducer(state = defaultState, action) {
  switch (action.type) {
    // ----------------------------------------------
    // CHANGE_STEP
    // ----------------------------------------------
    case "CHANGE_STEP":
      let nextStep = state.step + action.stepJump;

      if (nextStep < 1) {
        nextStep = 1;
      }
      if (nextStep > NUMBER_OF_STEPS) {
        nextStep = NUMBER_OF_STEPS;
      }

      return {
        ...state,
        step: nextStep,
        stepCompletionPercentage: 0,
      };

    // ----------------------------------------------
    // CHANGE_PERCENTAGE
    // ----------------------------------------------
    case "CHANGE_PERCENTAGE":
      const percentage = action.value;

      return {
        ...state,
        stepCompletionPercentage: percentage,
      };

    // ----------------------------------------------
    // DEFAULT
    // ----------------------------------------------
    default:
      return state;
  }
}

// ============================================================================
// Actions
// ============================================================================
const actions = {
  changeStep: (stepJump) => {
    return {
      type: "CHANGE_STEP",
      stepJump,
    };
  },
  changePercentage: (value) => {
    return {
      type: "CHANGE_PERCENTAGE",
      value,
    };
  },
};

// ============================================================================
// Store
// ============================================================================
const AppContainer = connect(
  function mapStateToProps(state) {
    return {
      step: state.step,
      stepCompletionPercentage: state.stepCompletionPercentage,
    };
  },
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
  }
)(App);

const store = createStore(reducer, defaultState);

// ============================================================================
// Render Application
// ============================================================================
render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("app")
);
