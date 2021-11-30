/* eslint-disable @typescript-eslint/no-explicit-any */

import { checkCollision } from './MapBuilder';

// eslint-disable
const Movement = (entities: any, { input }: any) => {
  const { payload } = input.find((x: any) => x.name === 'onKeyDown') || {};
  const playerMovement = entities.Player;

  const checkValidPlayerInitialCoordinates = () => {
    if (playerMovement.y === undefined) {
      playerMovement.y = 0;
    }

    if (playerMovement.x === undefined) {
      playerMovement.x = 0;
    }
  };

  const checkOutOfBounds = (direction: string) => {
    // contains a 20px buffer because of character size
    if (direction === 'north' && playerMovement.y - 20 < 20) return false;
    if (direction === 'south' && playerMovement.y + 20 > 580) return false;
    if (direction === 'west' && playerMovement.x - 20 < 20) return false;
    if (direction === 'east' && playerMovement.x + 20 > 780) return false;

    return true;
  };

  if (payload) {
    checkValidPlayerInitialCoordinates();

    switch (payload.key.toLowerCase()) {
      case 'w' || 'ArrowUp':
        playerMovement.direction = 'north';

        if (checkOutOfBounds('north') && checkCollision(playerMovement.x, playerMovement.y - 20)) {
          playerMovement.y -= 20;
        } else {
          playerMovement.y = 0;
        }

        break;
      case 's' || 'arrowdown':
        playerMovement.direction = 'south';

        if (checkOutOfBounds('south') && checkCollision(playerMovement.x, playerMovement.y - 20)) {
          playerMovement.y += 20;
        } else {
          playerMovement.y = 580;
        }

        break;
      case 'a' || 'arrowleft':
        playerMovement.direction = 'west';

        if (checkOutOfBounds('west') && checkCollision(playerMovement.x - 20, playerMovement.y)) {
          playerMovement.x -= 20;
        } else {
          playerMovement.x = 20;
        }

        break;
      case 'd' || 'arrowright':
        playerMovement.direction = 'east';

        if (checkOutOfBounds('east') && checkCollision(playerMovement.x + 20, playerMovement.y)) {
          playerMovement.x += 20;
        } else {
          playerMovement.x = 780;
        }

        break;
      default:
        break;
    }
  }

  return entities;
};

export { Movement };
