import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { ApiService } from './../api.service';

export class ADDTODO {
  payload: TodoItem;
  constructor(name: string) {
    this.payload = new TodoItem(name);
  }
}

export class TodoItem {
  constructor(public content: string) {}
}

export interface TodosStateModel {
  dataset: TodoItem[];
}

@State<TodosStateModel>({
  name: 'todos',
  defaults: {
    dataset: [new TodoItem('Hello NGXS')]
  }
})
export class TodosState {
  constructor(private service: ApiService) {}

  @Action(ADDTODO)
  addTodo(
    { getState, setState }: StateContext<TodosStateModel>,
    { payload }: ADDTODO
  ) {
    return this.service.someApiCall().pipe(
      tap(() => {
        const state = getState();
        setState({
          ...state,
          dataset: [...state.dataset, payload]
        });
      })
    );
  }
}
