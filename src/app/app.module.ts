import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { ApiService } from './core/services/api.service';
import { FormFieldComponent } from './shared/components/form-field/form-field.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatNativeDateModule,
  MatCheckboxModule,
  MatRadioModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './shared/components/card/card.component';
import { FutState } from './shared/store';

@NgModule({
  declarations: [AppComponent, FormFieldComponent, CardComponent],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([FutState]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatRadioModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule
  ],
  entryComponents: [FormFieldComponent],
  providers: [ApiService, FormFieldComponent],
  bootstrap: [AppComponent, FormFieldComponent]
})
export class AppModule {}
