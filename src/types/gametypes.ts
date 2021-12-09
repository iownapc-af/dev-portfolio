export interface NPCtype {
  id: string;
  name: string;
  type: string;
  xcoordinate: number;
  ycoordinate: number;
  map: {
    mapId: number;
    mapName: string;
    mapContents: string[][];
  };
}

export interface PlayerType {
  id: string;
  name: string;
  direction: string;
  xcoordinate: number;
  ycoordinate: number;
  map: {
    mapId: number;
    mapName: string;
    mapContents: string[][];
  };
}

export interface MapType {
  mapId: number;
  name: string;
  mapContents: string[][];
}
