import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
  {
    path: 'signin',
    loadChildren: './signin/signin.module#SignInModule'
  },
  {
    path: 'forgot-password',
    loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule'
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule
  ]
})
export class AuthModule {
}
