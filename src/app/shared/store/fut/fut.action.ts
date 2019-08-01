import { PlayerModel } from './fut.model';

export class GetAllTeams {
  static type = 'Get all teams';
  constructor() {}
}

export class AddPlayer {
  static type = 'Add a player';
  constructor(public teamId: number, public player: PlayerModel) {}
}

export class ModifyPlayer {
  static type = 'Modify a player';
  constructor(public teamId: number, public player: PlayerModel) {}
}

export class SetCurrentPlayer {
  static type = 'Set current player edited';
  constructor(public player: PlayerModel) {}
}

export class DeletePlayer {
  static readonly type = 'Delete a player';
  constructor(public teamId: number, public playerId: number) {}
}
