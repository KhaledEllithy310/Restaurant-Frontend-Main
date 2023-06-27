import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TablesComponent } from './tables/tables.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './products/add-product/add-product.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'Categories',
        component: CategoriesComponent,
      },
      {
        path: 'tables',
        component: TablesComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
        children: [
          // {
          //   path: 'addProduct',
          //   component: AddProductComponent,
          // },
        ],
      },
      {
        path: 'addProduct',
        component: AddProductComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    CategoriesComponent,
    TablesComponent,
    ProductsComponent,
    AddProductComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
