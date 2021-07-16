// Reducers

const initialState = {
  step: 1,
  stepCompletionPercentage: 0,
};
const NUMBER_OF_STEPS = 4;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "CHANGE_STEP":
      let nextStep = state.step + payload;
      if (nextStep > NUMBER_OF_STEPS) nextStep = 4;
      return { ...state, step: nextStep, stepCompletionPercentage: 0 };

    case "CHANGE_PERCENTAGE":
      const percentage = payload;
      return {
        ...state,
        stepCompletionPercentage: percentage,
      };
    default:
      return state;
  }
};

/*
function (state = defaultState, action) {
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
  */
