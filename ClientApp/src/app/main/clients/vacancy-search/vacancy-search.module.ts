import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import { VacancySearchComponent } from 'app/main/clients/vacancy-search/vacancy-search.component';
import { VacancySearchService } from 'app/main/clients/vacancy-search/vacancy-search.service';
import { VacancyListComponent } from 'app/main/clients/vacancy-search/vacancy-list/vacancy-list.component';
import { VacancySearchSelectedBarComponent } from 'app/main/clients/vacancy-search/selected-bar/selected-bar.component';
import { VacancySearchMainSidebarComponent } from 'app/main/clients/vacancy-search/sidebars/main/main.component';

const routes: Routes = [
    {
        path     : '**',
    component: VacancySearchComponent,
        resolve  : {
          contacts: VacancySearchService
        }
    }
];

@NgModule({
    declarations   : [
       VacancySearchComponent,
       VacancyListComponent,
       VacancySearchSelectedBarComponent,
       VacancySearchMainSidebarComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers      : [
      VacancySearchService
    ],
    entryComponents: [
    ]
})
export class VacancySearchModule
{
}
