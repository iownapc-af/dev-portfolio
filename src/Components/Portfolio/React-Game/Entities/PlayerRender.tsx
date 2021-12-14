/* eslint-disable react/sort-comp */
import '../Game.scss';

interface PlayerProps {
  direction: string;
  x: number | undefined;
  y: number | undefined;
}

const PlayerRender = (props: PlayerProps) => {
  const playerEntity = {
    direction: props.direction,
    coords: [props.x || -20, props.y || -20],
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
};

export { PlayerRender };
