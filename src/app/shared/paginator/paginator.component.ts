import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  @Input() totalRecords: number = 0;
  @Input() rows: number = 0;
  @Output() pageChange = new EventEmitter<number>();
  page: number = 1;

  onPageChange(page: number): void {
    this.page = page;
    this.pageChange.emit(this.page);
  }
}
