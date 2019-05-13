import { AddPlayer } from './../state-management/fut.action';
import { FutState } from './../state-management/fut.state';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Player } from '../models/fut.models';
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

  myPlayer: FormGroup;
  player: Player = null;

  file: any;
  fileToString: string;

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
    if (this.myPlayer.status === 'VALID') {
      console.log(this.myPlayer);

      console.log(this.player);

      this.player.name = this.myPlayer.controls['name'].value;
      this.player.position = this.myPlayer.value['position'].value;
      this.player.rating = this.myPlayer.value['position'].value;
      this.player.imageBase64 = this.myPlayer.value['file'].value;
      this.player.spec.vit_value = this.myPlayer.value['vit'].value;
      this.player.spec.dri_value = this.myPlayer.value['dri'].value;
      this.player.spec.tir_value = this.myPlayer.value['tir'].value;
      this.player.spec.def_value = this.myPlayer.value['def'].value;
      this.player.spec.pas_value = this.myPlayer.value['pas'].value;
      this.player.spec.phy_value = this.myPlayer.value['phy'].value;

      console.log(this.player);

      // this._store.dispatch(new AddPlayer());
    }
  }
  deletePlayer() {
    console.log(this.myPlayer);
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
