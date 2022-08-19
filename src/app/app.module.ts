import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenericDatagridModule } from './generic-datagrid/generic-datagrid.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    GenericDatagridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
