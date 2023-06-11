import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/interceptors/auth.guard';
import { LoginGuard } from './core/interceptors/login.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'tracking',
    loadChildren: () =>
      import('./modules/tracking/tracking.module').then(
        (m) => m.TrackingModule
      ),
    data: {
      requiresAuth: false,
      breadcrumb: { label: 'Seguimiento', url: '/tracking' },
    },
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
    data: { breadcrumb: { label: 'Inicio', url: '/' } },
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./modules/client/client.module').then((m) => m.ClientModule),
    data: { breadcrumb: { label: 'Clientes', url: '/client' } },
    canActivate: [AuthGuard],
  },
  {
    path: 'city',
    loadChildren: () =>
      import('./modules/city/city.module').then((m) => m.CityModule),
    data: { breadcrumb: { label: 'Ciudades', url: '/city' } },
  },
  {
    path: 'operation',
    loadChildren: () =>
      import('./modules/operation/operation.module').then(
        (m) => m.OperationModule
      ),
    canActivate: [AuthGuard],
    data: { breadcrumb: { label: 'Operaciones', url: '/operation' } },
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
