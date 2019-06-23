import React, {PureComponent} from "react";

const withFilmDuration = (WrappedComponent) => {
  class WithFilmDuration extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        filmDuration: {
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      };

      this.updateFilmDuration = this.updateFilmDuration.bind(this);
    }

    updateFilmDuration(hours, minutes, seconds) {
      this.setState({
        filmDuration: {hours, minutes, seconds}
      });
    }

    render() {
      const {filmDuration} = this.state;

      return (
        <WrappedComponent
          {...this.props}
          filmDuration={filmDuration}
          updateFilmDuration={this.updateFilmDuration}
        />
      );
    }
  }

  return WithFilmDuration;
};

export default withFilmDuration;
