import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NgbAlertModule,
  NgbDatepicker,
  NgbDropdownModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TablesComponent } from './tables/tables.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './products/add-product/add-product.component';
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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorInterceptor } from '../helpers/http.interceptor';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'Categories', component: CategoriesComponent },
      { path: 'tables', component: TablesComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/add', component: AddProductComponent },
      {
        path: 'products/product-details/:id',
        component: ProductDetailsComponent,
      },
      { path: 'users', component: UsersComponent },
      { path: 'users/add', component: AddUsersComponent },
      { path: 'users/edit/:id', component: EditUsersComponent },
      { path: 'ingridents', component: IngridentsComponent },
      { path: 'ingridents/add', component: AddIngridentsComponent },
      { path: 'ingridents/edit/:id', component: EditIngridentsComponent },
      { path: 'kitchen', component: KitchenComponent },
      { path: 'reservation', component: ReservationComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];

// const routes: Routes = [
//   {path: '', component: AdminComponent},
//   {path: 'dashboard', component: DashboardComponent},

// ];

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    CategoriesComponent,
    TablesComponent,
    ProductsComponent,
    AddProductComponent,
    UsersComponent,
    AddUsersComponent,
    EditUsersComponent,
    IngridentsComponent,
    AddIngridentsComponent,
    EditIngridentsComponent,
    KitchenComponent,
    ReservationComponent,
    ProfileComponent,
    ProductDetailsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    CommonModule,
    NgbModule,
  ],
  providers: [],
  exports: [AdminComponent],
})
export class AdminModule {}
