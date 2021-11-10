export type Block = {
  blockType: 'wall' | 'empty' | 'door' | 'player';
};
export type GridSquare = {
  blockCoordinates: [];
  blockType: Block;
};
