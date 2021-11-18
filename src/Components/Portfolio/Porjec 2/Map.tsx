import { AppState } from '../../..';
import { useAppDispatch, useAppSelector } from '../../../Store/AppState';
import { npcList } from './NPC';

export const ReturnMapTile = (indexMap: number, indexY: number, indexX: number) => {
  const gameMap = useAppSelector((state: AppState) => state.overworld);

  if (gameMap[indexMap][indexY][indexX]) return gameMap[indexMap][indexY][indexX];
  return '';
};

export const doorCoords = [
  {
    currentCoords: '5,7,0',
    newPlayerCoords: [25, 15],
    newRoomIndex: 1,
  },
  {
    currentCoords: '16,25,1',
    newPlayerCoords: [7, 6],
    newRoomIndex: 0,
  },
];

const Map = () => {
  const dispatch = useAppDispatch();
  const gameMap = useAppSelector((state: AppState) => state.overworld);
  const player = useAppSelector((state: AppState) => state.player);
  const indexMap = useAppSelector((state: AppState) => state.indexMap);

  const gridsquare = (gridclass: string, indexX: number, indexY: number, mapIndex: number) => {
    let classString = gridclass;

    if (gridclass === 'player') {
      classString = `${gridclass} ${player.playerDirection}`;
    }

    // if (gridclass === 'enemy') {
    // 	classString = `${gridclass} ${enemy.playerDirection}`;
    // }

    return (
      <div className={`gridsquare ${classString}`} id={`${indexX},${indexY},${mapIndex}`}>
        {' '}
      </div>
    );
  };

  const mapGridType = (indexY: number, indexX: number, mapIndex: number, type: string) => {
    if (indexY === player.playerCoords[0] && indexX === player.playerCoords[1]) {
      return gridsquare('player', indexX, indexY, mapIndex);
    }

    switch (gameMap[mapIndex][indexX][indexY]) {
      case '#':
        return gridsquare('border', indexX, indexY, mapIndex);
      case '1':
        return gridsquare('wall', indexX, indexY, mapIndex);
      case ' ':
        return gridsquare('empty', indexX, indexY, mapIndex);
      case ':':
        return gridsquare('door', indexX, indexY, mapIndex);
      case '-':
        return gridsquare('attac', indexX, indexY, mapIndex);
      case 'x':
        return gridsquare('enemy', indexX, indexY, mapIndex);
    }
  };

  const renderNPC = (indexX: number, indexY: number) => {
    for (let npc = 0; npc < npcList.length; npc++) {
      if (
        JSON.stringify(npcList[npc].coords) === JSON.stringify([indexY, indexX, indexMap]) &&
        gameMap[indexMap][indexY][indexX] !== 'x'
      ) {
        const gameMAP = [...gameMap];

        gameMAP[indexMap][npcList[npc].preCoords[0]][npcList[npc].preCoords[1]] = ' ';
        gameMAP[indexMap][indexY][indexX] = 'x';
        dispatch({ type: 'UPDATE_MAP', updateMap: gameMAP });
      }
    }

    return mapGridType(indexX, indexY, indexMap, '');
  };

  const drawMap = () => {
    return (
      <>
        {gameMap[indexMap]?.map((row, indexY) => {
          return (
            <div className="gridRow" key={`${indexY - 1} d`}>
              {row.map((column: unknown, indexX: number) => {
                return renderNPC(indexX, indexY);
              })}
            </div>
          );
        })}
      </>
    );
  };

  return drawMap();
};

export default Map;
