import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { AppComponent }  from './components/app.component';
import { HttpClient } from './services/http.service';

@NgModule({
  imports:      [ HttpModule, BrowserModule ],
  declarations: [ AppComponent ],
  providers:    [ HttpClient ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
