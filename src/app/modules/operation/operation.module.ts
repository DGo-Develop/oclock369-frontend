import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { OperationRoutingModule } from './operation-routing.module';
import { AllocateComponent } from './allocate/allocate.component';
import { LoadComponent } from './load/load.component';


@NgModule({
  declarations: [
    AllocateComponent,
    LoadComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    OperationRoutingModule
  ]
})
export class OperationModule { }
