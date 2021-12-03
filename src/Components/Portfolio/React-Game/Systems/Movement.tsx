/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable
const Movement = (entities: any, { input }: any) => {
  const { payload } = input.find((x: any) => x.name === 'onKeyDown') || {};
  const playerMovement = entities.Player;

  const checkValidPlayerInitialCoordinates = () => {
    if (playerMovement.y === undefined) {
      playerMovement.y = 20;
    }

    if (playerMovement.x === undefined) {
      playerMovement.x = 20;
    }
  };

  if (payload) {
    checkValidPlayerInitialCoordinates();

    switch (payload.key.toLowerCase()) {
      case 'w' || 'ArrowUp':
        playerMovement.direction = 'north';
        playerMovement.y -= 20;

        // } else {
        //   playerMovement.y = 0;
        // }

        break;
      case 's' || 'arrowdown':
        playerMovement.direction = 'south';

        playerMovement.y += 20;
        // } else {
        //   playerMovement.y = 580;
        // }

        break;
      case 'a' || 'arrowleft':
        playerMovement.direction = 'west';

        // if (checkOutOfBounds('west') && checkCollision(playerMovement.x - 20, playerMovement.y)) {
        playerMovement.x -= 20;
        // } else {
        //   playerMovement.x = 20;
        // }

        break;
      case 'd' || 'arrowright':
        playerMovement.direction = 'east';

        // if (checkCollision(playerMovement.x + 20, playerMovement.y)) {
        playerMovement.x += 20;
        // } else {
        //   playerMovement.x = 780;
        // }

        break;
      default:
        break;
    }
  }

  return entities;
};

export { Movement };
