import React from 'react';
import renderer from 'react-test-renderer';

import VideoPlayer from './video-player';
import films from '../../mocks/films';

describe(`The application is displayed correctly.`, () => {
  it(`VideoPlayer correctly renders after launch`, () => {
    const {src, poster} = films[0];

    const component = renderer.create(
        <VideoPlayer
          src={src}
          poster={poster}
          muted={true}
          isPlaying={false}
        />,
        {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
