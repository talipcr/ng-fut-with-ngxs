export interface Team {
  teamId: number;
  name: string;
  players?: Array<Player>;
}

export class Player {
  id: number;
  playerId: number;
  name: string;
  imageBase64: string;
  rating: number;
  position: string;
  spec: listOfSpec;
}

export class listOfSpec {
  vit_value: number;
  dri_value: number;
  tir_value: number;
  def_value: number;
  pas_value: number;
  phy_value: number;
}
