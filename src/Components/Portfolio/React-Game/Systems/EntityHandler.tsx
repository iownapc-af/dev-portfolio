import { useEffect, useState } from 'react';
import { NPCtype } from '../../../../types/gametypes';
import { getAllNPCs } from '../clients/npcClient';
import { getPlayer } from '../clients/playerClient';
import NPC from '../Entities/NPC';

const EntityHandler = () => {
  const [npcList, setNPCList] = useState<NPCtype[]>([]);
  const [playerMapId, setPlayerMapId] = useState<Number>();

  useEffect(() => {
    setInterval(() => {
      getPlayer('placeholder').then((res) => {
        setPlayerMapId(res.map.mapId);
      });

      getAllNPCs().then((npcs) => {
        setNPCList(npcs);
      });
    }, 750);
  }, []);

  const entityBuilder = () => {
    return (
      <>
        {npcList.map((entity) => {
          return entity.map.mapId === playerMapId ? (
            <NPC x={entity.xcoordinate} y={entity.ycoordinate} key={entity.id} />
          ) : (
            <></>
          );
        })}
      </>
    );
  };

  return entityBuilder();
};

export { EntityHandler };
