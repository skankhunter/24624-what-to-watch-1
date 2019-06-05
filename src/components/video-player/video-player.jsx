import React, {Component} from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();

    this.state = {
      progress: 0,
      isPlaying: props.isPlaying,
    };
  }

  render() {
    const {preview, poster, muted} = this.props;

    return (
      <video
        ref={this._videoRef}
        src={preview}
        poster={poster}
        muted={muted}
        width="280"
        height="175"
      />
    );
  }

  componentDidMount() {
    const video = this._videoRef.current;
    video.onplay = () => {
      this.setState({isPlaying: true});
    };

    video.onpause = () => {
      this.setState({isPlaying: false});
      video.load();
    };

    video.ontimeupdate = () => {
      this.setState({progress: video.currentTime});
    };
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.onplay = null;
    video.onpause = null;
    video.ontimeupdate = null;
    video.src = ``;
  }
}

VideoPlayer.propTypes = {
  preview: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  muted: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};
export default VideoPlayer;
