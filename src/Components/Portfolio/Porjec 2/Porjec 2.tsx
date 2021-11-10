// import { Map } from 'typescript';
import { useEffect, useState } from 'react';
import { AppState } from '../../..';
import { useAppDispatch, useAppSelector } from '../../../Store/AppState';
import './Porjec 2.scss';

const Porjec2 = () => {
  // const dispatch = useAppDispatch();
  // const playerCoord = useAppSelector((state: AppState) => state.player.playerCoords);
  const tempGameMap = useAppSelector((state: AppState) => state.map);
  const [playerCoord, setPlayerCoord] = useState<number[]>([5, 5]);

  useEffect(() => {
    document.addEventListener('keydown', SHMOOOVING, false);
    return () => {
      document.removeEventListener('keydown', SHMOOOVING, false);
    };
  });

  const gridsquare = (gridclass: string) => {
    return <div className={`gridsquare ${gridclass}`}> </div>;
  };

  const mapGridType = (indexY: number, indexX: number) => {
    if (indexY === playerCoord[0] && indexX === playerCoord[1]) return gridsquare('player');

    switch (tempGameMap[indexX][indexY]) {
      case '#':
        return gridsquare('wall');
      case ' ':
        return gridsquare('empty');
    }
  };

  const drawMap = () => {
    return (
      <>
        {tempGameMap?.map((row, indexY) => {
          return (
            <div className="gridRow" key={`${indexY - 1} d`}>
              {/* {row.split('').map((column: unknown, indexX: number) => { */}
              {row.map((column: unknown, indexX: number) => {
                return mapGridType(indexX, indexY);
              })}
            </div>
          );
        })}
      </>
    );
  };

  const SHMOOOVING = (key: KeyboardEvent) => {
    if (tempGameMap) {
      switch (key.key) {
        case 'w':
          if (tempGameMap[playerCoord[1] - 1][playerCoord[0]] === ' ') {
            setPlayerCoord([playerCoord[0], playerCoord[1] - 1]);
          }
          break;
        case 's':
          if (tempGameMap[playerCoord[1] + 1][playerCoord[0]] === ' ') {
            setPlayerCoord([playerCoord[0], playerCoord[1] + 1]);
          }
          break;
        case 'a':
          if (tempGameMap[playerCoord[1]][playerCoord[0] - 1] === ' ') {
            setPlayerCoord([playerCoord[0] - 1, playerCoord[1]]);
          }
          break;
        case 'd':
          if (tempGameMap[playerCoord[1]][playerCoord[0] + 1] === ' ') {
            setPlayerCoord([playerCoord[0] + 1, playerCoord[1]]);
          }
          break;
      }
    }
  };

  return <div className="gameMap">{drawMap()}</div>;
};

export default Porjec2;
