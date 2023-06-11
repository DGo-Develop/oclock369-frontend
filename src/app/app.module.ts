import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from './shared/menu/menu.module';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { FooterModule } from './shared/footer/footer.module';
import { CardsModule } from './shared/cards/cards.module';
import { HttpErrorInterceptor } from './core/interceptors/error.interceptor';
import { MessageModalComponent } from './core/message-modal/message-modal.component';
import { BreadcrumbModule } from './shared/breadcrumb/breadcrum.module';

@NgModule({
  declarations: [AppComponent, MessageModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenuModule,
    FooterModule,
    CardsModule,
    BreadcrumbModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
