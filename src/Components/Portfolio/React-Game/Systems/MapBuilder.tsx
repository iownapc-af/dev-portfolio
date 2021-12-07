import { useEffect, useState } from 'react';
import { getMapContents } from '../clients/mapClient';

// collision detection
// const checkCollision = (_tileX: number, _tileY: number) => {
//   const longstringthing = mapList[1].join().replaceAll(',', '');
//   console.log(longstringthing);
//   // get tile position based on coordinates
//   const mapTileX = _tileX / tileSize;
//   const mapTileY = _tileY / tileSize;

//   console.log(mapTileX, mapTileY, mapList[0][mapTileY][mapTileX]);

//   if (mapList[0][mapTileY][mapTileX] === ' ') return true;

//   return false;
// };

const MapBuilder = () => {
  const [map, setMap] = useState<String[][]>([]);

  const initializeMap = () => {
    getMapContents().then((res) => {
      const tempMap: string[][] = res.map((str) => {
        return str.split('');
      });

      setMap(tempMap);
    });
  };

  const buildMap = () => {
    if (map.length === 0) {
      initializeMap();
    }

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

export { MapBuilder };
