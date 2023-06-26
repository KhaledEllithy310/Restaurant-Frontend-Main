import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AddUsersComponent } from './users/add-users/add-users.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';
import { TextMutedPipe } from '../pipes/text-muted.pipe';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/add', component: AddUsersComponent},
  {path: 'users/edit/:id', component: EditUsersComponent},
];

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    UsersComponent, 
    AddUsersComponent, 
    EditUsersComponent,
    TextMutedPipe
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [AdminComponent],
})
export class AdminModule {}
