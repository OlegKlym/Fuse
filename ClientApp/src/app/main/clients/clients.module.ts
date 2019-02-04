import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
  {
    path: 'client-search',
    loadChildren: './client-search/client-search.module#ClientSearchModule'
  },
  {
    path: 'vacancy-search',
    loadChildren: './vacancy-search/vacancy-search.module#VacancySearchModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule
  ]
})
export class ClientsModule {
}
