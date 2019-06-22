import React, {PureComponent} from "react";

const withDisabledElements = (WrappedComponent) => {
  class WithDisabledElements extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        submitButtonDisabled: true,
        textareaDisabled: true
      };

      this.changeSubmitButtonState = this.changeSubmitButtonState.bind(this);
      this.changeTextareaState = this.changeTextareaState.bind(this);
    }

    changeSubmitButtonState(state) {
      this.setState({
        submitButtonDisabled: state
      });
    }

    changeTextareaState(state) {
      this.setState({
        textareaDisabled: state
      });
    }

    render() {
      const {submitButtonDisabled, textareaDisabled} = this.state;

      return (
        <WrappedComponent
          {...this.props}
          submitButtonDisabled={submitButtonDisabled}
          textareaDisabled={textareaDisabled}
          changeSubmitButtonState={this.changeSubmitButtonState}
          changeTextareaState={this.changeTextareaState}
        />
      );
    }
  }

  return WithDisabledElements;
};

export default withDisabledElements;
