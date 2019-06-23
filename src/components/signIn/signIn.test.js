import React from "react";
import renderer from "react-test-renderer";

import {SignIn} from "./signIn.jsx";

const mocks = {
  homeRedirect: jest.fn(),
  changeAuthorizationStatus: jest.fn(),
  validateMail: jest.fn(),
  validatePassword: jest.fn(),
  emailError: false,
  passwordError: false,
  authorizationFailed: false,
  authorized: true,
  history: {
    push: jest.fn()
  }
};

describe(`SignIn:`, () => {
  it(`Correctly renders after relaunch`, () => {
    const tree = renderer.create(<SignIn {...mocks} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
