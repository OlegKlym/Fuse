import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule, MatExpansionModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';

import { ClientSearchComponent } from 'app/main/clients/client-search/client-search.component';
import { ClientSearchService } from 'app/main/clients/client-search/client-search.service';
import { ClientsListComponent } from 'app/main/clients/client-search/client-list/client-list.component';
import { ClientSearchSelectedBarComponent } from 'app/main/clients/client-search/selected-bar/selected-bar.component';
import { ClientSearchMainSidebarComponent } from 'app/main/clients/client-search/sidebars/main/main.component';

const routes: Routes = [
  {
    path: '**',
    component: ClientSearchComponent,
    resolve: {
      contacts: ClientSearchService
    }
  }
];

@NgModule({
  declarations: [
    ClientSearchComponent,
    ClientsListComponent,
    ClientSearchSelectedBarComponent,
    ClientSearchMainSidebarComponent
  ],
  imports: [
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
    MatExpansionModule,

    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule
  ],
  providers: [
    ClientSearchService
  ],
  entryComponents: [
    ContactsContactFormDialogComponent
  ]
})
export class ClientSearchModule {
}
