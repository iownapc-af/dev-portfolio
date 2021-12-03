/* eslint-disable react/sort-comp */
import { PureComponent } from 'react';
import '../Game.scss';

interface PlayerProps {
  direction: string;
  x: number;
  y: number;
}

class Player extends PureComponent<PlayerProps> {
  render() {
    const playerEntity = {
      direction: this.props.direction,
      coords: [this.props.x || 20, this.props.y || 20],
    };

    return (
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
