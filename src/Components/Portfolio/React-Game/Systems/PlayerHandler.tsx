/* eslint-disable react/sort-comp */
import { useEffect, useState } from 'react';
import { PlayerType } from '../../../../types/gametypes';
import { getPlayer } from '../clients/playerClient';
import { PlayerRender } from '../Entities/Player';
import '../Game.scss';

const PlayerHandler = () => {
  const [player, setPlayer] = useState<PlayerType>();

  useEffect(() => {
    setInterval(() => {
      getPlayer('w').then((res) => {
        setPlayer(res);
      });
    }, 500);
  }, []);

  const playerBuilder = () => {
    if (player) {
      return (
        <>
          <PlayerRender
            x={player?.xcoordinate}
            y={player?.ycoordinate}
            direction={player?.direction}
          />
        </>
      );
    }

    return <></>;
  };

  return playerBuilder();
};

export { PlayerHandler };
