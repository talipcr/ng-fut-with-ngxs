import { Observable } from 'rxjs/Observable';
import { FutState } from './../state-management/fut.state';
import { Select } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { Player } from '../models/fut.models';

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

  constructor() {}

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
  }

  onClick(e) {
    e.preventDefault();
    this.bool = !this.bool;
  }
}
