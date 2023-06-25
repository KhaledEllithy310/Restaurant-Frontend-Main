import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent
}];

@NgModule({
  declarations: [AdminComponent, DashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [AdminComponent],
})
export class AdminModule {}
