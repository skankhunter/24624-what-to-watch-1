import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this.video = React.createRef();
  }

  render() {
    const {poster, preview} = this.props;
    return (
      <video
        ref={this.video}
        src={preview}
        poster={poster}
        width="280"
        height="175"
        muted
      />
    );
  }
}

VideoPlayer.propTypes = {
  preview: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};
export default VideoPlayer;
