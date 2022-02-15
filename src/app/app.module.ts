import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module'; 

import { AppComponent } from './app.component'; 
import { NopagefoundComponent } from './pages/nopagefound/nopagefound/nopagefound.component';

import { HttpClientModule } from '@angular/common/http';
 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule, 
    HttpClientModule ,
    BrowserAnimationsModule,
    NgbModule, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
