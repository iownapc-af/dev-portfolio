/* eslint-disable react/sort-comp */
import { getPlayer } from '../clients/playerClient';
import '../Game.scss';

interface PlayerProps {
  direction: string;
  x: number | null;
  y: number | null;
}

const PlayerRender = (props: PlayerProps) => {
  const playerEntity = {
    direction: props.direction,
    coords: [props.x || -20, props.y || -20],
  };

  if (props.x === null || -20) {
    setTimeout(() => {
      getPlayer('placeholder').then((res) => {
        playerEntity.coords[0] = res.xcoordinate;
        playerEntity.coords[1] = res.ycoordinate;
      });
    }, 500);
  }

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
};

export { PlayerRender };
