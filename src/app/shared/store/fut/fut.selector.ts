import { Selector } from '@ngxs/store';
import { FutState } from './fut.state';
import { FutStateModel } from './fut.model';

export class FutSelector {
  @Selector([FutState])
  static SetCurrentPlayer(state: FutStateModel) {
    return state.currentPlayer;
  }

  @Selector([FutState])
  static getTeam(state: FutStateModel) {
    return state.teams;
  }

  @Selector([FutState])
  static currentPlayer(state: FutStateModel) {
    return state.currentPlayer;
  }

  @Selector([FutState])
  static numberOfPlayers(state: FutStateModel) {
    return state.teams[0].players.length;
  }
}
