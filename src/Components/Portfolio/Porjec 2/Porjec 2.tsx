// import { Map } from 'typescript';
import { useEffect } from 'react';
import { AppState } from '../../..';
import { useAppDispatch, useAppSelector } from '../../../Store/AppState';
import { PlayerDirection } from '../../../types/PlayerAction';
import './Porjec 2.scss';

export type Directions = 'north' | 'south' | 'east' | 'west';

const Porjec2 = () => {
  // const playerCoord = useAppSelector((state: AppState) => state.player.playerCoords);
  const dispatch = useAppDispatch();
  const tempGameMap = useAppSelector((state: AppState) => state.map);
  const player = useAppSelector((state: AppState) => state.player);

  useEffect(() => {
    document.addEventListener('keydown', inputHandler, false);
    return () => {
      document.removeEventListener('keydown', inputHandler, false);
    };
  });

  const gridsquare = (gridclass: string, indexX: number, indexY: number) => {
    return (
      <div
        className={`gridsquare ${gridclass} ${player.playerDirection}`}
        id={`${indexX},${indexY}`}
      >
        {' '}
      </div>
    );
  };

  const mapGridType = (indexY: number, indexX: number) => {
    if (indexY === player.playerCoords[0] && indexX === player.playerCoords[1]) {
      return gridsquare('player', indexX, indexY);
    }

    switch (tempGameMap[indexX][indexY]) {
      case '#':
        return gridsquare('wall', indexX, indexY);
      case ' ':
        return gridsquare('empty', indexX, indexY);
      case ':':
        return gridsquare('door', indexX, indexY);
      case '-':
        return gridsquare('attac', indexX, indexY);
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

  const moveDirection: { [K in PlayerDirection]: { tile: string; coord: string } } = {
    north: {
      tile: tempGameMap[player.playerCoords[1] - 1][player.playerCoords[0]],
      coord: `${player.playerCoords[1] - 1},${player.playerCoords[0]}`,
    },
    south: {
      tile: tempGameMap[player.playerCoords[1] + 1][player.playerCoords[0]],
      coord: `${player.playerCoords[1] + 1},${player.playerCoords[0]}`,
    },
    west: {
      tile: tempGameMap[player.playerCoords[1]][player.playerCoords[0] - 1],
      coord: `${player.playerCoords[1]},${player.playerCoords[0] - 1}`,
    },
    east: {
      tile: tempGameMap[player.playerCoords[1]][player.playerCoords[0] + 1],
      coord: `${player.playerCoords[1]},${player.playerCoords[0] + 1}`,
    },
  };

  const inputHandler = (key: KeyboardEvent) => {
    if (tempGameMap) {
      switch (key.key) {
        case 'w':
          dispatch({ type: 'UPDATE_PLAYER_DIRECTION', updatePlayerDirection: 'north' });
          if (moveDirection.north.tile === ' ') {
            dispatch({
              type: 'UPDATE_PLAYER_COORDS',
              updatePlayerCoords: [player.playerCoords[0], player.playerCoords[1] - 1],
            });
          }
          break;
        case 's':
          dispatch({ type: 'UPDATE_PLAYER_DIRECTION', updatePlayerDirection: 'south' });
          if (moveDirection.south.tile === ' ') {
            dispatch({
              type: 'UPDATE_PLAYER_COORDS',
              updatePlayerCoords: [player.playerCoords[0], player.playerCoords[1] + 1],
            });
          }
          break;
        case 'a':
          dispatch({ type: 'UPDATE_PLAYER_DIRECTION', updatePlayerDirection: 'west' });
          if (moveDirection.west.tile === ' ') {
            dispatch({
              type: 'UPDATE_PLAYER_COORDS',
              updatePlayerCoords: [player.playerCoords[0] - 1, player.playerCoords[1]],
            });
          }
          break;
        case 'd':
          dispatch({ type: 'UPDATE_PLAYER_DIRECTION', updatePlayerDirection: 'east' });
          if (moveDirection.east.tile === ' ') {
            dispatch({
              type: 'UPDATE_PLAYER_COORDS',
              updatePlayerCoords: [player.playerCoords[0] + 1, player.playerCoords[1]],
            });
          }
          break;
        case ' ':
          // document.getElementById(moveDirection[player.playerDirection].coord);
          break;
      }
    }
  };

  return (
    <>
      <div className="gameMap">{drawMap()}</div>
      <div className="ui">
        <span>
          Coordinates: ({player.playerCoords[0]}, {player.playerCoords[1]})
        </span>
        <span>Direction: {player.playerDirection}</span>
      </div>
    </>
  );
};

export default Porjec2;
