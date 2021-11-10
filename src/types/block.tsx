export type Block = {
  blockType: 'wall' | 'empty' | 'player';
};
export type GridSquare = {
  blockCoordinates: [];
  blockType: Block;
};
