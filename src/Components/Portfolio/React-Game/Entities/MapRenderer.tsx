import { useEffect, useState } from 'react';
import { getMapContents } from '../clients/mapClient';
import { getPlayer } from '../clients/playerClient';

const MapRenderer = () => {
  const [map, setMap] = useState<String[][]>([]);
  const [noise, setNoise] = useState<number[]>([]);

  useEffect(() => {
    const tempNoise: number[] = [];
    for (let longloop = 0; longloop < 1201; longloop++) {
      tempNoise.push(Math.floor(Math.random() * 4));
    }

    setNoise(tempNoise);

    setInterval(() => {
      getPlayer('placeholder').then((res) => {
        initializeMap(res.map.mapId);
      });
    }, 500);
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
    return (
      <>
        {map?.map((row, indexY) => {
          return row.map((column: unknown, indexX: number) => {
            const treeType = noise[(indexX + 1) * (indexY + 1)];
            switch (map[indexY][indexX]) {
              case '#':
                return (
                  <div
                    className={`tile tree${treeType}`}
                    style={{ top: indexY * 20, left: indexX * 20 }}
                  >
                    {' '}
                  </div>
                );
              case ':':
                return (
                  <div className="tile door" style={{ top: indexY * 20, left: indexX * 20 }}>
                    {' '}
                  </div>
                );
              case ',':
                return (
                  <div className="tile grass" style={{ top: indexY * 20, left: indexX * 20 }}>
                    {' '}
                  </div>
                );
              case '.':
                return (
                  <div className="tile flower" style={{ top: indexY * 20, left: indexX * 20 }}>
                    {' '}
                  </div>
                );
              case 'W':
                return (
                  <div className="tile wall" style={{ top: indexY * 20, left: indexX * 20 }}>
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
