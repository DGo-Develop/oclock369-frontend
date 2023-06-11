import { Component } from '@angular/core';
import { LoggerService } from 'src/app/core/logger/logger.service';
import { LocationService } from 'src/app/core/services/location.service';
import { City } from '../city.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  cities: City[] = [];
  totalRecords: number = 0;
  rows: number = 10;
  page: number = 1;
  searchText: string | undefined;

  constructor(
    private logger: LoggerService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.loadCities(this.page, this.rows);
  }

  loadCities(page: number, pageSize: number): void {
debugger
    this.locationService.getCities(page, pageSize).subscribe((response) => {
      this.cities = response.data.cities;
      this.totalRecords = response.data.totalCount;
    });
  }

  onPageChange(page: number): void {
    this.loadCities(this.page, this.rows);
  }
}
