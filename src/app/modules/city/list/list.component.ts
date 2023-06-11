import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoggerService } from 'src/app/core/logger/logger.service';
import { LocationService } from 'src/app/core/services/location.service';
import { City } from '../city.model';
import { PagingConfig } from 'src/app/core/models/paging.config.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements PagingConfig {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  cities: City[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalItems: number = 0;

  searchText: string = '';
  pagingConfig: PagingConfig = {} as PagingConfig;

  constructor(
    private logger: LoggerService,
    private locationService: LocationService
  ) {
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems,
    };
  }

  ngOnInit(): void {
    this.loadCities(this.currentPage, this.itemsPerPage);
  }

  loadCities(page: number, pageSize: number): void {
    this.currentPage = page;
    this.pagingConfig.currentPage = this.currentPage;

    this.locationService.getCities(page, pageSize).subscribe((response) => {
      this.cities = response.data.cities;
      this.pagingConfig.totalItems = response.data.totalCount;
      this.pagingConfig.currentPage = response.data.page;
    });
  }

  onPageChange(page: number): void {
    this.loadCities(page, this.itemsPerPage);
  }

  onSearchTextChange(): void {
    const searchText = this.searchInput.nativeElement.value.toLowerCase();
    // Aplica el filtro con searchText
  }
  
}
