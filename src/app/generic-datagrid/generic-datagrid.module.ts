import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericDatagridComponent } from './generic-datagrid.component';
import { ClrDatagridModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    GenericDatagridComponent
  ],
  imports: [
    CommonModule,
    ClrDatagridModule,
    HttpClientModule
  ],
  exports: [
    GenericDatagridComponent
  ]
})
export class GenericDatagridModule { }
