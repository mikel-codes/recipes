import React, { Component } from "react";
import { ChangePercentage, ChangeStep } from "./Actions";
import AppForm from "../AppForm";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  step: state.step,
  stepCompletionPercentage: state.stepCompletionPercentage,
});

const mapDispatchToProps = { ChangePercentage, ChangeStep };

export const FormConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppForm);
