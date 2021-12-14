// Player name, hp, mana
// Map name

import { useEffect, useState } from 'react';
import { PlayerType } from '../../../../types/gametypes';
import { getPlayer } from '../clients/playerClient';

const Interface = () => {
  const [interfaceData, setInterfaceData] = useState<PlayerType>();
  const [forceUpdate, setForceUpdate] = useState<number>(0);

  useEffect(() => {
    getPlayer('empty').then((player) => {
      setInterfaceData(player);
    });

    document.addEventListener('keydown', getUpdate, false);

    return () => {
      document.removeEventListener('keydown', getUpdate, false);
    };
  });

  const getUpdate = () => {
    setForceUpdate(forceUpdate + 1);
  };

  return (
    <div className="interface">
      <span>Healthy: {interfaceData?.health}</span>
      <span>Location: {interfaceData?.map.mapName}</span>
    </div>
  );
};

export { Interface };
