import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
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
  {
    path:'customer',
    loadChildren:()=>
    import('./customer/customer.module').then((m)=>m.CustomerModule)
  },{
  path:'cashier',
  loadChildren:() =>
  import('./cashier/cashier.module').then((m)=>m.CashierModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
