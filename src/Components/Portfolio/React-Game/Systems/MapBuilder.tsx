const mapList = [
  [
    '########################################'.split(''),
    '#  #                                   #'.split(''),
    '#   #     #####                        #'.split(''),
    '#    #                                 #'.split(''),
    '#     #                                #'.split(''),
    '#      #                               #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '########################################'.split(''),
  ],
  [
    '########################################'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '#                                      #'.split(''),
    '########################################'.split(''),
  ],
];

const tileSize = 20;

// collision detection
const checkCollision = (_tileX: number, _tileY: number) => {
  // get tile position based on coordinates
  const mapTileX = _tileX / tileSize - 1;
  const mapTileY = _tileY / tileSize - 1;

  console.log(mapTileX, ',', mapTileY);

  // if (mapList[0][mapTileY][mapTileX] === ' ') return true;

  return false;
};

const MapBuilder = () => {
  const buildMap = () => {
    /*
      get map to build
      iterate through map array to get the tile to place
      render the game
    */
    if (checkCollision(0, 0)) console.log('uh');
  };

  return buildMap;
};

export { MapBuilder, checkCollision };
