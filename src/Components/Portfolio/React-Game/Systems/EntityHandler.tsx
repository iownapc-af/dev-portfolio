// import { PureComponent } from 'react';
import { useEffect, useState } from 'react';
import { NPCtype } from '../../../../types/gametypes';
import { getAllNPCs } from '../clients/npcClient';
import NPC from '../Entities/NPC';

const EntityHandler = () => {
  const [npcList, setNPCList] = useState<NPCtype[]>([]);

  useEffect(() => {
    getAllNPCs().then((res) => {
      setNPCList(res);
    });
  });

  const entityBuilder = () => {
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
