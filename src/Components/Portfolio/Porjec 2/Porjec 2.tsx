// import { Map } from 'typescript';
import { useEffect } from 'react';
import { AppState } from '../../..';
import { useAppDispatch, useAppSelector } from '../../../Store/AppState';
import { PlayerDirection } from '../../../types/PlayerAction';
import Map, { ReturnMapTile, doorCoords } from './Map';
import NPC from './NPC';
import './Porjec 2.scss';

export type Directions = 'north' | 'south' | 'east' | 'west';

const Porjec2 = () => {
  const dispatch = useAppDispatch();
  const player = useAppSelector((state: AppState) => state.player);
  const indexMap = useAppSelector((state: AppState) => state.indexMap);

  useEffect(() => {
    document.addEventListener('keydown', inputHandler, false);
    return () => {
      document.removeEventListener('keydown', inputHandler, false);
    };
  });

  useEffect(() => {
    setInterval(() => {
      NPC.updateAI();
    }, 750);
  });

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
      tile: ReturnMapTile(indexMap, player.playerCoords[1] - 1, player.playerCoords[0]),
      coord: `${player.playerCoords[1] - 1},${player.playerCoords[0]}`,
    },
    south: {
      tile: ReturnMapTile(indexMap, player.playerCoords[1] + 1, player.playerCoords[0]),
      coord: `${player.playerCoords[1] + 1},${player.playerCoords[0]}`,
    },
    west: {
      tile: ReturnMapTile(indexMap, player.playerCoords[1], player.playerCoords[0] - 1),
      coord: `${player.playerCoords[1]},${player.playerCoords[0] - 1}`,
    },
    east: {
      tile: ReturnMapTile(indexMap, player.playerCoords[1], player.playerCoords[0] + 1),
      coord: `${player.playerCoords[1]},${player.playerCoords[0] + 1}`,
    },
  };

  const inputHandler = (key: KeyboardEvent) => {
    switch (key.key.toLowerCase()) {
      // check if movedirection tile is an entity

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
          const door = doorCoords.filter((room) => {
            return (
              room.currentCoords === `${moveDirection[player.playerDirection].coord},${indexMap}`
            );
          });

          if (door[0] !== undefined) {
            dispatch({
              type: 'UPDATE_PLAYER_COORDS',
              updatePlayerCoords: [door[0].newPlayerCoords[0], door[0].newPlayerCoords[1]],
            });
            dispatch({
              type: 'UPDATE_INDEX_MAP',
              updateIndexMap: door[0].newRoomIndex,
            });
          }
          /*
              choose a map to place the player on based on the coordinates of the door.
              also need to figure out how to draw different maps
            */
        }
        break;
    }
  };

  return (
    <>
      <div className="gameMap">
        <Map />
      </div>
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
