import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { FutState } from './fut.state';
import { Team, Player } from './models/fut.models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SetCurrentPlayer } from './fut.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  @Select(FutState.getTeam)
  teams$: Observable<Team>;

  team: Team;
  futForm: FormGroup;

  constructor(private store: Store, private formBuilder: FormBuilder) {}

  ngOnInit(){
    this.teams$.subscribe((data: Team) => {
      if(data){
        this.team = data;
        console.log(this.team);
      }
    });

    this.futForm = this.formBuilder.group({
      futTeam : [''],
      futPlayer: ['']
    });
  }

  addTodo(input) {
    // this.store.dispatch(new ADDTODO(input.value)).subscribe(state => {
    //   console.log(state);
    //   input.value = '';
    // });
  }

  setCurrentPlayer(player: Player){
    this.store.dispatch(new SetCurrentPlayer(player));
  }
}
