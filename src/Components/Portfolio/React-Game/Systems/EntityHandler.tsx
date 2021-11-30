// import { PureComponent } from 'react';
import { useEffect } from 'react';
// import { npcList } from '../../Porjec 2/NPC';
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
    y: 40,
  },
  {
    id: 2,
    entityType: 'npc',
    x: 40,
    y: 258,
  },
  {
    id: 3,
    entityType: 'npc',
    x: 20,
    y: 580,
  },
  {
    id: 4,
    entityType: 'npc',
    x: 200,
    y: 160,
  },
  {
    id: 5,
    entityType: 'npc',
    x: 320,
    y: 50,
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
        if (entityList[entity].y - 18 > 40) {
          entityList[entity].y -= 18;
        } else {
          entityList[entity].y = 40;
        }
        break;
      case 1: // down
        if (entityList[entity].y - 18 < 554) {
          entityList[entity].y += 18;
        } else {
          entityList[entity].y = 548;
        }
        break;
      case 2: // left
        if (entityList[entity].x - 18 > 40) {
          entityList[entity].x -= 18;
        } else {
          entityList[entity].x = 40;
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
    // if (entityList.length < 1) HELLAFROGS();
    return (
      <>
        {entityList.map((entity) => {
          return <NPC x={entity.x} y={entity.y} key={entity.id} />;
        })}
      </>
    );
  };

  return entityBuilder();
};

export { EntityHandler };
