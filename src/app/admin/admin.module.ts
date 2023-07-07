import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NgbAlertModule,
  NgbDatepicker,
  NgbDropdownModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TablesComponent } from './tables/tables.component';
import { UsersComponent } from './users/users.component';
import { AddUsersComponent } from './users/add-users/add-users.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';
import { IngridentsComponent } from './ingridents/ingridents.component';
import { AddIngridentsComponent } from './ingridents/add-ingridents/add-ingridents.component';
import { EditIngridentsComponent } from './ingridents/edit-ingridents/edit-ingridents.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { kitchenGuard } from '../guard/kitchen.guard';
import { adminGuard } from '../guard/admin.guard';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { guestGuard } from '../guard/guest.guard';
import { ProductsModule } from './products/products.module';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'Categories',
        loadChildren: () =>
          import('./categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      { path: 'users', component: UsersComponent, 
        // canActivate: [adminGuard] 
      },
      { path: 'users/add', component: AddUsersComponent, 
        // canActivate: [adminGuard] 
      },
      { path: 'users/edit/:id', component: EditUsersComponent,
        // canActivate: [adminGuard] 
      },
      { path: 'ingridents', component: IngridentsComponent, 
        // canActivate: [adminGuard] 
      },
      { path: 'ingridents/add', component: AddIngridentsComponent,
        // canActivate: [adminGuard] 
      },
      { path: 'ingridents/edit/:id', component: EditIngridentsComponent,
        // canActivate: [adminGuard] 
      },
      { path: 'kitchen', component: KitchenComponent,
        // canActivate: [kitchenGuard] 
      },
      { path: 'tables', component: TablesComponent },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
      },
      { path: 'reservation', component: ReservationComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    TablesComponent,
    UsersComponent,
    AddUsersComponent,
    EditUsersComponent,
    IngridentsComponent,
    AddIngridentsComponent,
    EditIngridentsComponent,
    KitchenComponent,
    ReservationComponent,
    ProfileComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    CommonModule,
    NgbModule,
    ProductsModule,
  ],
  providers: [],
  exports: [AdminComponent],
})
export class AdminModule {}
