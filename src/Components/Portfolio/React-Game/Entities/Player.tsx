/* eslint-disable react/sort-comp */
import { PureComponent } from 'react';
import '../Game.scss';

interface PlayerProps {
  direction: string;
  x: number;
  y: number;
}

class Player extends PureComponent<PlayerProps> {
  // movePlayer(x: number, y: number, direction: string) {
  //   switch (direction) {
  //     case 'north':
  //       this.playerEntity.direction = 'north';

  //       if (this.playerEntity.coords[1] - 18 > 0) {
  //         this.playerEntity.coords[1] -= 18;
  //       } else {
  //         this.playerEntity.coords[1] = 0;
  //       }
  //       break;
  //   }
  // }

  render() {
    const playerEntity = {
      direction: this.props.direction,
      coords: [this.props.x, this.props.y],
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
