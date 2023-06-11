import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackingRoutingModule } from './tracking-routing.module';
import { QueryComponent } from './query/query.component';


@NgModule({
  declarations: [
    QueryComponent
  ],
  imports: [
    CommonModule,
    TrackingRoutingModule
  ]
})
export class TrackingModule { }
