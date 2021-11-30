// import { PureComponent } from 'react';
import { useEffect, useState } from 'react';
import { NPCtype } from '../../../../types/NPCtype';
import { getAllNPCs } from '../clients/npcClient';
import NPC from '../Entities/NPC';

const EntityHandler = () => {
  const [npcList, setNPCList] = useState<NPCtype[]>([]);

  useEffect(() => {
    getAllNPCs().then((res) => {
      setNPCList(res);
    });
  });

  useEffect(() => {
    setInterval(() => {
      entityMovement();
    }, 50);
  }, []);

  const entityMovement = () => {
    const moveDirection = Math.floor(Math.random() * 6);
    const entity = Math.floor(Math.random() * npcList.length);
    if (npcList.length > 0) {
      switch (moveDirection) {
        case 0: // up
          if (npcList[entity].ycoordinate - 18 > 40) {
            npcList[entity].ycoordinate -= 18;
          } else {
            npcList[entity].ycoordinate = 40;
          }
          break;
        case 1: // down
          if (npcList[entity].ycoordinate - 18 < 554) {
            npcList[entity].ycoordinate += 18;
          } else {
            npcList[entity].ycoordinate = 548;
          }
          break;
        case 2: // left
          if (npcList[entity].xcoordinate - 18 > 40) {
            npcList[entity].xcoordinate -= 18;
          } else {
            npcList[entity].xcoordinate = 40;
          }
          break;
        case 3: // right
          if (npcList[entity].xcoordinate - 18 < 754) {
            npcList[entity].xcoordinate += 18;
          } else {
            npcList[entity].xcoordinate = 778;
          }
          break;
        case 4: // Doesn't move if 4/5 are rolled
        case 5:
          break;
      }
    }

    return null;
  };

  const entityBuilder = () => {
    // if (npcList.length < 1) HELLAFROGS();
    return (
      <>
        {npcList.map((entity) => {
          return <NPC x={entity.xcoordinate} y={entity.ycoordinate} key={entity.id} />;
        })}
      </>
    );
  };

  return entityBuilder();
};

export { EntityHandler };
