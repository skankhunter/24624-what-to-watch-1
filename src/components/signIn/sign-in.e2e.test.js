import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {SignIn} from "./signIn.jsx";

Enzyme.configure({adapter: new Adapter()});

const mocks = {
  homeRedirect: jest.fn(),
  changeAuthorizationStatus: jest.fn(),
  validateMail: jest.fn(),
  validatePassword: jest.fn(),
  emailError: false,
  passwordError: false,
  authorizationFailed: false,
  authorized: false,
  history: {
    push: jest.fn()
  }
};

describe(`SignIn:`, () => {
  it(`Should run callback validateMail, validatePassword on submit button click`, () => {
    const signIn = mount(<SignIn {...mocks} />);

    const submitButton = signIn.find(`.sign-in__btn`);

    submitButton.simulate(`click`, {preventDefault() {}});
    expect(mocks.validateMail).toHaveBeenCalledTimes(1);
    expect(mocks.validatePassword).toHaveBeenCalledTimes(1);
  });
});
