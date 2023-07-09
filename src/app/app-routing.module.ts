import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guard/auth.guard';
import { adminGuard } from './guard/admin.guard';
import { guestGuard } from './guard/guest.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { customerGuard } from './guard/customer.guard';
import { ProfileComponent } from './shared/profile/profile.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { waiterGuard } from './guard/waiter.guard';
import { cashierGuard } from './guard/cashier.guard';
import { kitchenGuard } from './guard/kitchen.guard';
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
      canActivate: [authGuard, waiterGuard]
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
      // canActivate: [guestGuard]
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
      canActivate: [authGuard, adminGuard]
  },
  {
    path:'customer',
    loadChildren:()=>
    import('./customer/customer.module').then((m)=>m.CustomerModule),
          canActivate: [customerGuard]

  },
  {
    path:'cashier',
    loadChildren:() =>
    import('./cashier/cashier.module').then((m)=>m.CashierModule),
    canActivate: [authGuard, cashierGuard]
  },
  {
    path:'profile', component: ProfileComponent,
    canActivate: [authGuard]
  },
  { path: 'kitchen', component: KitchenComponent,
    canActivate: [authGuard, kitchenGuard]
  },
  {
    path: 'stripe',
    loadChildren: () =>
      import('./stripesystem/stripesystem.module').then((m) => m.StripesystemModule),
      // canActivate: [authGuard]
  },
  {
    path: '**',
    component: NotfoundComponent,
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
