import '../Game.scss';

interface Props {
  x: number;
  y: number;
  name: string;
}

const NPC = (props: Props) => {
  const npcEntity = {
    coords: [props.x, props.y],
    name: props.name,
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div
      style={{
        position: 'absolute',
        left: npcEntity.coords[0],
        top: npcEntity.coords[1],
      }}
      // className="game-npc"
      className={npcEntity.name}
      id="npc"
    >
      {' '}
    </div>
  );
};

export default NPC;
