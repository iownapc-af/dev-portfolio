/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from 'react';
import { PlayerType } from '../../../../types/gametypes';
import { getPlayer } from '../clients/playerClient';

// eslint-disable
const Movement = (entities: any, { input }: any) => {
  const { payload } = input.find((x: any) => x.name === 'onKeyDown') || {};
  // const [player, setPlayer] = useState<PlayerType>();

  const playerAction = entities.PlayerRender;

  if (payload) {
    getPlayer(payload.key).then((res) => {
      updatePlayer(res);
      // setPlayer(res);
    });
  }

  const updatePlayer = (player: PlayerType) => {
    playerAction.direction = player.direction;
    playerAction.x = player.xcoordinate;
    playerAction.y = player.ycoordinate;
  };

  return entities;
};

export { Movement };
