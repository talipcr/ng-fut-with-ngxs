import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Player } from '../models/fut.models';
import { Select } from '@ngxs/store';
import { FutState } from '../fut.state';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnInit {

  @Select(FutState.currentPlayer)
  currentPlayer$: Observable<Player>;
  
  myPlayer: FormGroup;
  player: Player;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(){
    this.currentPlayer$.subscribe(data => {
      if(data){
        this.player = data;
      }
      this.initForm();
    })
  }

  initForm(){
    this.myPlayer = new FormGroup({
      name: new FormControl(this.player ? this.player.name : ''),
      rating: new FormControl(this.player ? this.player.rating : ''),
      position: new FormControl(this.player ? this.player.position : ''),
      vit: new FormControl(this.player ? this.player.spec.vit_value : ''),
      dri: new FormControl(this.player ? this.player.spec.dri_value : ''),
      tir: new FormControl(this.player ? this.player.spec.tir_value : ''),
      def: new FormControl(this.player ? this.player.spec.def_value : ''),
      pas: new FormControl(this.player ? this.player.spec.pas_value : ''),
      phy: new FormControl(this.player ? this.player.spec.phy_value : '')
    });
  }
}