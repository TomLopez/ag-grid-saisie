import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import {OtherComponent} from "./other.component";
import {TestComponent} from "./test/test.component";


@NgModule({
  declarations: [
    AppComponent,
    OtherComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([OtherComponent, TestComponent])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
