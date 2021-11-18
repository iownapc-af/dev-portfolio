const Movement = (entities, { input }) => {
  const { payload } = input.find((x) => x.name === 'onKeyPress') || {};

  if (payload) {
    const playerMovement = entities.Player;
    // check if moving out of bounds

    switch (payload.key) {
      case 'w':
        playerMovement.direction = 'north';
        if (playerMovement.y - 18 > 0) {
          playerMovement.y -= 18;
        } else {
          playerMovement.y = 0;
        }
        break;
      case 's':
        playerMovement.direction = 'south';
        if (playerMovement.y - 18 < 554) {
          playerMovement.y += 18;
        } else {
          playerMovement.y = 578;
        }
        break;
      case 'a':
        playerMovement.direction = 'west';
        if (playerMovement.x - 18 > 0) {
          playerMovement.x -= 18;
        } else {
          playerMovement.x = 0;
        }
        break;
      case 'd':
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
