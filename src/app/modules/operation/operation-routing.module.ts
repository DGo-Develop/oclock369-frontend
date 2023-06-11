import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllocateComponent } from './allocate/allocate.component';
import { LoadComponent } from './load/load.component';

const routes: Routes = [
  {
    path: 'allocate',
    component: AllocateComponent,
    data: { breadcrumb: { label: 'Asignar', url: '/operation/allocate' } },
  },
  {
    path: 'load',
    component: LoadComponent,
    data: { breadcrumb: { label: 'Crear Guias', url: '/operation/load' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationRoutingModule {}
