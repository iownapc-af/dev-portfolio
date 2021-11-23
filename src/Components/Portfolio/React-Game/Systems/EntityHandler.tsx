// import { PureComponent } from 'react';
import { useEffect } from 'react';
import { npcList } from '../../Porjec 2/NPC';
import NPC from '../Entities/NPC';

const entityList = [
  {
    id: 0,
    entityType: 'npc',
    x: 450,
    y: 400,
  },
  {
    id: 1,
    entityType: 'npc',
    x: 80,
    y: 0,
  },
  {
    id: 2,
    entityType: 'npc',
    x: 0,
    y: 80,
  },
  {
    id: 3,
    entityType: 'npc',
    x: 20,
    y: 80,
  },
  {
    id: 4,
    entityType: 'npc',
    x: 200,
    y: 80,
  },
  {
    id: 5,
    entityType: 'npc',
    x: 320,
    y: 80,
  },
  {
    id: 6,
    entityType: 'npc',
    x: 380,
    y: 80,
  },
  {
    id: 7,
    entityType: 'npc',
    x: 300,
    y: 80,
  },
];

const EntityHandler = () => {
  useEffect(() => {
    setInterval(() => {
      entityMovement();
    }, 50);
  }, []);

  const entityMovement = () => {
    const moveDirection = Math.floor(Math.random() * 6);
    const entity = Math.floor(Math.random() * entityList.length);

    switch (moveDirection) {
      case 0: // up
        if (entityList[entity].y - 18 > 0) {
          entityList[entity].y -= 18;
        } else {
          entityList[entity].y = 0;
        }
        break;
      case 1: // down
        if (entityList[entity].y - 18 < 554) {
          entityList[entity].y += 18;
        } else {
          entityList[entity].y = 578;
        }
        break;
      case 2: // left
        if (entityList[entity].x - 18 > 0) {
          entityList[entity].x -= 18;
        } else {
          entityList[entity].x = 0;
        }
        break;
      case 3: // right
        if (entityList[entity].x - 18 < 754) {
          entityList[entity].x += 18;
        } else {
          entityList[entity].x = 778;
        }
        break;
      case 4: // Doesn't move if 4/5 are rolled
      case 5:
        break;
    }

    return null;
  };

  const entityBuilder = () => {
    // eslint-disable-next-line guard-for-in
    return (
      <>
        {entityList.map((entity) => {
          // entityMovement(entity.id);

          return <NPC x={entity.x} y={entity.y} key={entity.id} />;
        })}
      </>
    );
  };

  return entityBuilder();
};

export { EntityHandler };
