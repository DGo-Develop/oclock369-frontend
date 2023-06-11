import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [CommonModule, NgxPaginationModule],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}
