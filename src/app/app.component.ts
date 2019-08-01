import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import {
  FutSelector,
  TeamModel,
  PlayerModel,
  SetCurrentPlayer
} from './shared/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  @Select(FutSelector.getTeam)
  teams$: Observable<TeamModel>;

  @Select(FutSelector.numberOfPlayers)
  numberOfPlayers$: Observable<number>;

  team: TeamModel;
  futForm: FormGroup;

  numberOfPlayer: number;

  constructor(private store: Store, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.teams$.subscribe((data: TeamModel) => {
      if (data) {
        this.team = data;
        console.log(this.team);
      }

      this.numberOfPlayers$.subscribe(data => {
        this.numberOfPlayer = data;
      });
    });

    this.futForm = this.formBuilder.group({
      futTeam: [''],
      futPlayer: ['']
    });
  }

  onChange(e) {
    console.log(e);
  }

  newPlayer() {
    console.log('new');
  }

  setCurrentPlayer(player: PlayerModel) {
    this.store.dispatch(new SetCurrentPlayer(player));
  }
}
