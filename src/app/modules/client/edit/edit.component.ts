import { Component } from '@angular/core';
import { LoggerService } from 'src/app/core/logger/logger.service';
import { ApiResponse } from 'src/app/core/models/data.model';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  cities: any[] = [];

  constructor(
    private logger: LoggerService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities() {
    this.locationService.getCities().subscribe(
      (response) => {
        this.cities = response.data.cities;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
