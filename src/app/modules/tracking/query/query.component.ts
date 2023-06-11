import { Component } from '@angular/core';
import { Guide } from '../models/guide.model';
import { RouteService } from '../services/routes.services';
import { Constants } from 'src/app/constants/messages';
import { LoggerService } from 'src/app/core/logger/logger.service';
import { RecipientSender } from '../models/recipientSender.model';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css'],
})
export class QueryComponent {
  errorMessage: string = '';
  guide: Guide | undefined;

  constructor(
    private routeService: RouteService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.routeService.getRouteHistory('2023050800004').subscribe(
      (response) => {
        this.guide = response.data;
      },
      (error) => {
        let errorMessage = '';

        if (Array.isArray(error.error.error)) {
          errorMessage = 'Error en el formulario: ';
          error.error.error.forEach(
            (errorObj: { message: any }, index: number) => {
              errorMessage += ` ${errorObj.message}`;
              if (index !== error.error.error.length - 1) {
                errorMessage += ', ';
              }
            }
          );
        }

        if (
          error.error.error.message !== undefined &&
          error.error.error.message
        ) {
          errorMessage =
            error.error.error.message ?? Constants.ROUTE_GUIDE_NOT_FOUND;
        }

        this.errorMessage = `${errorMessage ?? ''}`;
        this.logger.logError(this.errorMessage, error.stack);
      }
    );
  }
}
