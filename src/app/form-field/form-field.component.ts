import { AddPlayer, DeletePlayer } from './../state-management/fut.action';
import { FutState } from './../state-management/fut.state';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Player, listOfSpec } from '../models/fut.models';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnInit {
  @Select(FutState.currentPlayer)
  currentPlayer$: Observable<Player>;

  @Select(FutState.numberOfPlayers)
  numberOfPlayers$: Observable<number>;

  myPlayer: FormGroup;
  player: Player;

  file: any;
  fileToString: string;

  currentId: number;

  constructor(private _store: Store) {}

  ngOnInit() {
    this.currentPlayer$.subscribe(data => {
      if (data) {
        this.player = data;
      }

      this.initForm();
    });
  }

  initForm() {
    this.myPlayer = new FormGroup({
      file: new FormControl(null),
      name: new FormControl(
        this.player ? this.player.name : '',
        Validators.required
      ),
      rating: new FormControl(
        this.player ? this.player.rating : '',
        Validators.required
      ),
      position: new FormControl(
        this.player ? this.player.position : '',
        Validators.required
      ),
      vit: new FormControl(
        this.player ? this.player.spec.vit_value : '',
        Validators.required
      ),
      dri: new FormControl(
        this.player ? this.player.spec.dri_value : '',
        Validators.required
      ),
      tir: new FormControl(
        this.player ? this.player.spec.tir_value : '',
        Validators.required
      ),
      def: new FormControl(
        this.player ? this.player.spec.def_value : '',
        Validators.required
      ),
      pas: new FormControl(
        this.player ? this.player.spec.pas_value : '',
        Validators.required
      ),
      phy: new FormControl(
        this.player ? this.player.spec.phy_value : '',
        Validators.required
      )
    });
  }

  addPlayer() {
    console.log(this.myPlayer);

    if (this.myPlayer.status === 'VALID') {
      this.numberOfPlayers$.subscribe(data => {
        if (data) {
          this.currentId = data;
        }
      });

      this.player = new Player();
      this.player.id = this.currentId + 1;
      this.player.playerId = this.player.id;
      this.player.name = this.myPlayer.controls['name'].value;
      this.player.position = this.myPlayer.controls['position'].value;
      this.player.rating = this.myPlayer.controls['rating'].value;
      if (this.myPlayer.controls['file'].value) {
        this.player.imageBase64 = this.myPlayer.controls['file'].value;
      } else {
        this.player.imageBase64 = '';
      }

      this.player.spec = new listOfSpec();
      this.player.spec.vit_value = this.myPlayer.controls['vit'].value;
      this.player.spec.dri_value = this.myPlayer.controls['dri'].value;
      this.player.spec.tir_value = this.myPlayer.controls['tir'].value;
      this.player.spec.def_value = this.myPlayer.controls['def'].value;
      this.player.spec.pas_value = this.myPlayer.controls['pas'].value;
      this.player.spec.phy_value = this.myPlayer.controls['phy'].value;

      this._store.dispatch(new AddPlayer(1, this.player));
    }
  }

  modifyPlayer() {
    console.log("ok it's done");
  }

  deletePlayer() {
    this._store.dispatch(new DeletePlayer(1, this.player.playerId));
  }

  onFileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.file = file;
      this.handleInputChange(file); //turn into base64
    }
  }

  handleInputChange(files) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    this.fileToString = base64result;
    this.myPlayer.controls['file'].patchValue(this.fileToString);
  }
}
