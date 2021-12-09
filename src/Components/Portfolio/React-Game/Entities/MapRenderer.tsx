import { useEffect, useState } from 'react';
import { getMapContents } from '../clients/mapClient';
import { getPlayer } from '../clients/playerClient';

const MapRenderer = () => {
  const [map, setMap] = useState<String[][]>([]);

  useEffect(() => {
    setInterval(() => {
      getPlayer('placeholder').then((res) => {
        initializeMap(res.map.mapId);
      });
    }, 1000);
  }, []);

  const initializeMap = (mapId: Number) => {
    getMapContents(mapId).then((res) => {
      const tempMap: string[][] = res.map((str) => {
        return str.split('');
      });

      setMap(tempMap);
    });
  };

  const buildMap = () => {
    // if (map.length === 0) {
    //   initializeMap();
    // }

    return (
      <>
        {map?.map((row, indexY) => {
          return row.map((column: unknown, indexX: number) => {
            switch (map[indexY][indexX]) {
              case '#':
                return (
                  <div className="square" style={{ top: indexY * 20, left: indexX * 20 }}>
                    {' '}
                  </div>
                );
              case ':':
                return (
                  <div className="door" style={{ top: indexY * 20, left: indexX * 20 }}>
                    {' '}
                  </div>
                );
              case ',':
                return (
                  <div className="grass" style={{ top: indexY * 20, left: indexX * 20 }}>
                    {' '}
                  </div>
                );
              case '.':
                return (
                  <div className="flower" style={{ top: indexY * 20, left: indexX * 20 }}>
                    {' '}
                  </div>
                );
              case 'W':
                return (
                  <div className="wall" style={{ top: indexY * 20, left: indexX * 20 }}>
                    {' '}
                  </div>
                );
            }
            return <></>;
          });
        })}
      </>
    );
  };

  return buildMap();
};

export { MapRenderer };
