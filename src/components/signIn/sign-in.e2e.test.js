import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {SignIn} from "./signIn.jsx";

Enzyme.configure({adapter: new Adapter()});

const mocks = {
  onHomeRedirect: jest.fn(),
  changeAuthorizationStatus: jest.fn(),
  onEmailValidate: jest.fn(),
  onPasswordValidate: jest.fn(),
  emailError: false,
  passwordError: false,
  authorizationFailed: false,
  authorized: false,
  history: {
    push: jest.fn()
  }
};

describe(`SignIn:`, () => {
  it(`Should run callback onEmailValidate, onPasswordValidate on submit button click`, () => {
    const signIn = mount(<SignIn {...mocks} />);

    const submitButton = signIn.find(`.sign-in__btn`);

    submitButton.simulate(`click`, {preventDefault() {}});
    expect(mocks.onEmailValidate).toHaveBeenCalledTimes(1);
    expect(mocks.onPasswordValidate).toHaveBeenCalledTimes(1);
  });
});
