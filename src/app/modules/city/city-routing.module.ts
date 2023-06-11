import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'edit',
    component: EditComponent,
    data: { breadcrumb: { label: 'Editar', url: '/city/edit' } },
  },
  {
    path: '',
    component: ListComponent,
    data: { breadcrumb: { label: 'Listar', url: '/city' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityRoutingModule {}
