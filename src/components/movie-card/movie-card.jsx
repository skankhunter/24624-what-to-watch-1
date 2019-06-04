import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import genres from '../../mocks/genres';
import withVideo from '../hocs/withVideo/withVideo.jsx';
import VideoPlayer from '../video-player/video-player.jsx';

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  _handleMouseEnter() {
    this._timer = setTimeout(() => {
      this.setState({isPlaying: true});
    }, 800);
  }

  _handleMouseLeave() {
    clearTimeout(this._timer);
    this.setState({isPlaying: false});
  }

  render() {
    const {item, onGenreClick} = this.props;
    const {name, preview_video_link: video, background_image: poster} = item;
    const {isPlaying} = this.state;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
      >
        <div className="small-movie-card__image">
          <VideoPlayer
            src={video}
            poster={poster}
            muted={true}
            isPlaying={isPlaying}
          />
        </div>
        <h3 className="small-movie-card__title">
          <a
            className="small-movie-card__link"
            href="movie-page.html"
            onClick={onGenreClick}
          >
            {name}
          </a>
        </h3>
      </article>
    );
  }
}

MovieCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    background_image: PropTypes.string.isRequired,
    preview_video_link: PropTypes.string.isRequired
  }).isRequired,
  onGenreClick: PropTypes.func,
};

export default withVideo(MovieCard);
