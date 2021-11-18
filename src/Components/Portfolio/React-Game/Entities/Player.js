import { PureComponent } from 'react';
import '../Game.scss';

class Player extends PureComponent {
  render() {
    const playerEntity = {
      direction: this.props.direction,
      coords: [this.props.x, this.props.y],
    };

    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div
        style={{
          position: 'absolute',
          left: playerEntity.coords[0],
          top: playerEntity.coords[1],
        }}
        className={`game-player ${playerEntity.direction}`}
        id="player"
      >
        {' '}
      </div>
    );
  }
}

export { Player };
