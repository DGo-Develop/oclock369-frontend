import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { PaginatorModule } from 'src/app/shared/paginator/paginator.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from 'src/app/core/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent, EditComponent, FilterPipe],
  imports: [
    CommonModule,
    CityRoutingModule,
    PaginatorModule,
    NgxPaginationModule,
    FormsModule,
  ],
})
export class CityModule {}
