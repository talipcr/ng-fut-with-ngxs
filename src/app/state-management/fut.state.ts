import { Team, Player } from './../models/fut.models';
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import {
  patch,
  append,
  removeItem,
  insertItem,
  updateItem
} from '@ngxs/store/operators';

import { ApiService } from './../api.service';
import {
  GetAllTeams,
  AddPlayer,
  SetCurrentPlayer,
  DeletePlayer,
  ModifyPlayer
} from './fut.action';
import { map, finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface FutStateModel {
  teams: Team;
  currentPlayer: Player;
}

@State<FutStateModel>({
  name: 'futStateModel',
  defaults: {
    teams: null,
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
    state.teams[0].players = [...state.teams[0].players, action.player];
    ctx.patchState(state);

    // Add in json
    return this.service.addPlayer(action.teamId, state.teams[0]);
  }

  @Action(ModifyPlayer)
  modifyPlayer(ctx: StateContext<FutStateModel>, action: AddPlayer) {
    const state = ctx.getState();
    // state.teams[0].players = [...state.teams[0].players, action.player];
    // let playerIndex = state.teams[0].players.indexOf()
    state.teams[0].players.forEach(player => {if (player.id == action.player.id) player = action.player})
    ctx.patchState(state);

    // Add in json
    return this.service.addPlayer(action.teamId, state.teams[0]);
  }

  @Action(SetCurrentPlayer)
  setCurrentPlayer(ctx: StateContext<FutStateModel>, action: SetCurrentPlayer) {
    // old code
    // const state = ctx.getState();
    // state.currentPlayer = action.player;
    // ctx.patchState(state);

    // new code
    ctx.setState(
      patch({
        currentPlayer: action.player
      })
    );
  }

  @Action(DeletePlayer)
  deletePlayer(ctx: StateContext<FutStateModel>, action: DeletePlayer) {
    const state = ctx.getState();
    state.teams[0].players = [
      ...state.teams[0].players.filter(p => p.playerId !== action.playerId)
    ];
    ctx.patchState(state);

    return this.service
      .addPlayer(action.teamId, state.teams[0])
      .pipe(
        map(data => {
          console.log(data);
        }),
        catchError(error => of(console.log('error'))),
        finalize(() => ctx.dispatch(new GetAllTeams()))
      )
      .subscribe(() => {
        state.currentPlayer = null;
        ctx.patchState(state);
      });
  }
}
