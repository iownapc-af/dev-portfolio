// import { Map } from 'typescript';
import { useEffect, useState } from 'react';
import { AppState } from '../../..';
import { useAppDispatch, useAppSelector } from '../../../Store/AppState';
import { PlayerDirection } from '../../../types/PlayerAction';
import './Porjec 2.scss';

export type Directions = 'north' | 'south' | 'east' | 'west';

const Porjec2 = () => {
  // const playerCoord = useAppSelector((state: AppState) => state.player.playerCoords);
  const dispatch = useAppDispatch();
  const tempGameMap = useAppSelector((state: AppState) => state.overworld);
  const player = useAppSelector((state: AppState) => state.player);
  const [indexMap, setIndexMap] = useState(0);

  useEffect(() => {
    document.addEventListener('keydown', inputHandler, false);
    return () => {
      document.removeEventListener('keydown', inputHandler, false);
    };
  });

  const gridsquare = (gridclass: string, indexX: number, indexY: number, mapIndex: number) => {
    let classString = gridclass;

    if (gridclass === 'player') {
      classString = `${gridclass} ${player.playerDirection}`;
    }

    return (
      <div className={`gridsquare ${classString}`} id={`${indexX},${indexY},${mapIndex}`}>
        {' '}
      </div>
    );
  };

  const mapGridType = (indexY: number, indexX: number, mapIndex: number) => {
    if (indexY === player.playerCoords[0] && indexX === player.playerCoords[1]) {
      return gridsquare('player', indexX, indexY, mapIndex);
    }

    switch (tempGameMap[mapIndex][indexX][indexY]) {
      case '#':
        return gridsquare('wall', indexX, indexY, mapIndex);
      case ' ':
        return gridsquare('empty', indexX, indexY, mapIndex);
      case ':':
        return gridsquare('door', indexX, indexY, mapIndex);
      case '-':
        return gridsquare('attac', indexX, indexY, mapIndex);
    }
  };

  const drawMap = () => {
    return (
      <>
        {tempGameMap[indexMap]?.map((row, indexY) => {
          return (
            <div className="gridRow" key={`${indexY - 1} d`}>
              {/* {row.split('').map((column: unknown, indexX: number) => { */}
              {row.map((column: unknown, indexX: number) => {
                return mapGridType(indexX, indexY, indexMap);
              })}
            </div>
          );
        })}
      </>
    );
  };

  let timeoutID: NodeJS.Timeout;
  const doAttac = () => {
    const attackSquare = document.getElementById(
      `${moveDirection[player.playerDirection].coord},${indexMap}`
    );
    attackSquare?.classList.add('attac', player.playerDirection);

    clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      attackSquare?.classList.remove('attac', player.playerDirection);
    }, 150);
  };

  const moveDirection: { [K in PlayerDirection]: { tile: string; coord: string } } = {
    north: {
      tile: tempGameMap[indexMap][player.playerCoords[1] - 1][player.playerCoords[0]],
      coord: `${player.playerCoords[1] - 1},${player.playerCoords[0]}`,
    },
    south: {
      tile: tempGameMap[indexMap][player.playerCoords[1] + 1][player.playerCoords[0]],
      coord: `${player.playerCoords[1] + 1},${player.playerCoords[0]}`,
    },
    west: {
      tile: tempGameMap[indexMap][player.playerCoords[1]][player.playerCoords[0] - 1],
      coord: `${player.playerCoords[1]},${player.playerCoords[0] - 1}`,
    },
    east: {
      tile: tempGameMap[indexMap][player.playerCoords[1]][player.playerCoords[0] + 1],
      coord: `${player.playerCoords[1]},${player.playerCoords[0] + 1}`,
    },
  };

  const doorCoords = [
    {
      currentCoords: `${moveDirection[player.playerDirection].coord},${indexMap}`,
      newRoomIndex: 1,
    },
    {
      currentCoords: `${moveDirection[player.playerDirection].coord},${indexMap}`,
      newRoomIndex: 0,
    },
  ];

  const inputHandler = (key: KeyboardEvent) => {
    if (tempGameMap) {
      switch (key.key.toLowerCase()) {
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
          if (moveDirection[player.playerDirection].tile !== '#') {
            doAttac();
          }
          if (moveDirection[player.playerDirection].tile === ':') {
            const door = doorCoords
              .filter((room) => {
                return (
                  room.currentCoords ===
                  `${moveDirection[player.playerDirection].coord},${indexMap}`
                );
              })
              .map((e) => e.newRoomIndex);
            console.log(door);
            setIndexMap(door[1]);
            /*
              choose a map to place the player on based on the coordinates of the door.
              also need to figure out how to draw different maps
            */
          }
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
