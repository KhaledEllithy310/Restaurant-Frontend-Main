import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaiterComponent } from './waiter/waiter.component';
import { LoginComponent } from './register/login/login.component';
import { SignupComponent } from './register/signup/signup.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'Waiter',
    pathMatch: 'full',
  },
  {
    path: 'Waiter',
    component: WaiterComponent,
  },
  {
    path: 'Waiter',
    loadChildren: () =>
      import('./waiter/waiter.module').then((m) => m.WaiterModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
