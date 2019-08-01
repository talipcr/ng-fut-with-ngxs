export interface FutStateModel {
  teams: TeamModel;
  currentPlayer: PlayerModel;
}

export interface TeamModel {
  teamId: number;
  name: string;
  players?: Array<PlayerModel>;
}

export class PlayerModel {
  id: number;
  playerId: number;
  name: string;
  imageBase64: string;
  rating: number;
  position: string;
  spec: playerListOfSpec;
}

export class playerListOfSpec {
  vit_value: number;
  dri_value: number;
  tir_value: number;
  def_value: number;
  pas_value: number;
  phy_value: number;
}
