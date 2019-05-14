import { Team, Player } from './../models/fut.models';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { ApiService } from './../api.service';
import { GetAllTeams, AddPlayer, SetCurrentPlayer } from './fut.action';

export interface FutStateModel {
  teams: Team[];
  currentPlayer: Player;
}

@State<FutStateModel>({
  name: 'futStateModel',
  defaults: {
    teams: [],
    currentPlayer: null
  }
})
export class FutState {
  @Selector()
  static getTeam(state: FutStateModel) {
    return state.teams;
  }

  @Selector()
  static currentPlayer(state: FutStateModel) {
    return state.currentPlayer;
  }

  @Selector()
  static numberOfPlayers(state: FutStateModel) {
    return state.teams[0].players.length;
  }

  constructor(private service: ApiService) {}

  ngxsOnInit(ctx: StateContext<FutStateModel>) {
    ctx.dispatch(new GetAllTeams()); //get all the teams when appli start or refresh
    // const player = {
    //   playerId: 5,
    //   name: "TEST",
    //   imageBase64: "TEST",
    //   rating: 99,
    //   position: "TEST",
    //   spec : null
    // }
    // ctx.dispatch(new AddPlayer(1, player)).pipe(tap(() => {
    //   ctx.dispatch(new GetAllTeams()) //get all the teams when appli start or refresh
    // }));
  }

  @Action(GetAllTeams)
  getAllTeams(ctx: StateContext<FutStateModel>) {
    return this.service.getAllTeams().subscribe((data: Team) => {
      if (data) {
        ctx.patchState({
          teams: Object.assign([], data)
        });
      }
    });
  }

  @Action(AddPlayer)
  addPlayer(ctx: StateContext<FutStateModel>, action: AddPlayer) {
    const state = ctx.getState();
    const result = state;
    console.log('result', result);
    result.teams[0].players = [...result.teams[0].players, action.player];
    ctx.patchState(result);
    return this.service.addPlayer(action.teamId, result.teams[0]);
  }

  @Action(SetCurrentPlayer)
  setCurrentPlayer(ctx: StateContext<FutStateModel>, action: SetCurrentPlayer) {
    const state = ctx.getState();
    const result = state;
    result.currentPlayer = action.player;
    ctx.patchState(result);
  }

  // @Action(DeletePlayer)
  // deletePlayer(ctx: StateContext<FutStateModel>, action: AddPlayer) {
  // }
}
