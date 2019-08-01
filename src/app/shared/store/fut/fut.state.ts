import { State, StateContext, Action } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { map, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { FutStateModel, TeamModel } from './fut.model';
import {
  GetAllTeams,
  AddPlayer,
  ModifyPlayer,
  SetCurrentPlayer,
  DeletePlayer
} from './fut.action';

@State<FutStateModel>({
  name: 'futStateModel',
  defaults: {
    teams: null,
    currentPlayer: null
  }
})
export class FutState {
  constructor(private service: ApiService) {}

  ngxsOnInit(ctx: StateContext<FutStateModel>) {
    ctx.dispatch(new GetAllTeams());
  }

  @Action(GetAllTeams)
  getAllTeams(ctx: StateContext<FutStateModel>) {
    return this.service.getAllTeams().subscribe((data: TeamModel) => {
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
    state.teams[0].players.forEach(player => {
      if (player.id == action.player.id) player = action.player;
    });
    ctx.patchState(state);

    // Add in json
    return this.service.addPlayer(action.teamId, state.teams[0]);
  }

  @Action(SetCurrentPlayer)
  setCurrentPlayer(ctx: StateContext<FutStateModel>, action: SetCurrentPlayer) {
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
