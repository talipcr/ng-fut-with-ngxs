import { Observable } from 'rxjs/Observable';
import { FutState } from './../state-management/fut.state';
import { Select, Actions, ofActionSuccessful } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Player } from '../models/fut.models';
import { DeletePlayer } from '../state-management/fut.action';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  bool: boolean;

  @Select(FutState.currentPlayer)
  currentPlayer$: Observable<Player>;

  player: Player = null;

  urlImage: string = '';

  constructor(private action: Actions) {}

  ngOnInit() {
    this.currentPlayer$.subscribe(data => {
      if (data) {
        this.bool = !this.bool;
        this.player = data;
      }

      if (this.player) {
        this.urlImage =
          'url(data:image/gif;base64,' + this.player.imageBase64 + ')';
        setTimeout(() => {
          this.bool = true;
        }, 1800);
      }
    });

    this.action.pipe(ofActionSuccessful(DeletePlayer)).subscribe(() => {
      this.player = null;
    })
  }

  onClick(e) {
    e.preventDefault();
    this.bool = !this.bool;
  }
}
