import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { FormFieldComponent } from './form-field/form-field.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule, MatCheckboxModule, MatRadioModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatIconModule, MatInputModule} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FutState } from './fut.state';

@NgModule({
  declarations: [AppComponent, FormFieldComponent],
  imports: [BrowserModule, NgxsModule.forRoot([FutState]), HttpClientModule, FormsModule, ReactiveFormsModule, MatNativeDateModule, MatRadioModule, BrowserAnimationsModule, MatCheckboxModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatIconModule, MatInputModule],
  entryComponents: [FormFieldComponent],
  providers: [ApiService, FormFieldComponent],
  bootstrap: [AppComponent, FormFieldComponent]
})
export class AppModule {}
