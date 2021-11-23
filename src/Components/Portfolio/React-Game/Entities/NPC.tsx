import '../Game.scss';

interface Props {
  x: number;
  y: number;
}

const NPC = (props: Props) => {
  const npcEntity = {
    coords: [props.x, props.y],
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div
      style={{
        position: 'absolute',
        left: npcEntity.coords[0],
        top: npcEntity.coords[1],
      }}
      className="game-npc"
      id="npc"
    >
      {' '}
    </div>
  );
};

export default NPC;
