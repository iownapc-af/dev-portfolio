import React from 'react';
import { store } from '../../..';

// function test() {
//   console.log(ReturnMapTile(npcList[0].coords[2], npcList[0].coords[0] - 1, npcList[0].coords[1]));
//   return '';
// }

export const npcList = [
  {
    id: 0,
    name: 'emeny1',
    type: 'emeny',
    moveDirection: '',
    preCoords: [10, 15, 0],
    coords: [10, 15, 0], // y,x,mapindex
    leashCoords: [3, 3],
  },
  {
    id: 1,
    name: 'emeny2',
    type: 'emeny',
    moveDirection: '',
    preCoords: [10, 15, 0],
    coords: [13, 23, 0], // y,x,mapindex
    leashCoords: [3, 3],
  },
];

class NPC extends React.Component {
  static returnMapTile = (indexMap: number, indexY: number, indexX: number) => {
    const gameMap = store.getState().overworld;

    if (gameMap[indexMap][indexY][indexX]) return gameMap[indexMap][indexY][indexX];
    return '';
  };

  static updateAI = () => {
    npcList.forEach((i) => {
      this.npcMove(i.id);
    });
  };

  static checkMovement = (id: number, moveDirections: number) => {
    switch (moveDirections) {
      case 0: // up
        if (
          this.returnMapTile(npcList[0].coords[2], npcList[0].coords[0] - 1, npcList[0].coords[1])
        ) {
          npcList[id].preCoords = npcList[id].coords;
          npcList[id].moveDirection = 'north';
          npcList[id].coords = [
            npcList[id].coords[0] - 1,
            npcList[id].coords[1],
            npcList[id].coords[2],
          ];
        }
        break;
      case 1: // down
        npcList[id].preCoords = npcList[id].coords;
        npcList[id].moveDirection = 'south';
        npcList[id].coords = [
          npcList[id].coords[0] + 1,
          npcList[id].coords[1],
          npcList[id].coords[2],
        ];
        break;
      case 2: // left
        npcList[id].preCoords = npcList[id].coords;
        npcList[id].moveDirection = 'west';
        npcList[id].coords = [
          npcList[id].coords[0],
          npcList[id].coords[1] - 1,
          npcList[id].coords[2],
        ];
        break;
      case 3: // right
        npcList[id].preCoords = npcList[id].coords;
        npcList[id].moveDirection = 'east';
        npcList[id].coords = [
          npcList[id].coords[0],
          npcList[id].coords[1] + 1,
          npcList[id].coords[2],
        ];
        break;
      case 4: // Doesn't move if 4/5 are rolled
      case 5:
        break;
    }

    return false;
  };

  static npcMove = (id: number) => {
    const moveDirection = Math.floor(Math.random() * 6);

    this.checkMovement(id, moveDirection);
  };

  tempGameMap = store.getState().overworld;
}

export default NPC;
