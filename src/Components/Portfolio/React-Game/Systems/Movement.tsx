/* eslint-disable @typescript-eslint/no-explicit-any */
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

  if (payload) {
    checkValidPlayerInitialCoordinates();

    switch (payload.key.toLowerCase()) {
      case 'w' || 'ArrowUp':
        playerMovement.direction = 'north';
        if (playerMovement.y - 18 > 0) {
          playerMovement.y -= 18;
        } else {
          playerMovement.y = 0;
        }
        break;
      case 's' || 'arrowdown':
        playerMovement.direction = 'south';
        if (playerMovement.y - 18 < 554) {
          playerMovement.y += 18;
        } else {
          playerMovement.y = 578;
        }
        break;
      case 'a' || 'arrowleft':
        playerMovement.direction = 'west';
        if (playerMovement.x - 18 > 0) {
          playerMovement.x -= 18;
        } else {
          playerMovement.x = 0;
        }
        break;
      case 'd' || 'arrowright':
        playerMovement.direction = 'east';
        if (playerMovement.x - 18 < 754) {
          playerMovement.x += 18;
        } else {
          playerMovement.x = 778;
        }
        break;
      default:
        break;
    }
  }

  return entities;
};

export { Movement };
