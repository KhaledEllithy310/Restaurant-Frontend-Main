import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { HomeSection1Component } from './home-section1/home-section1.component';



@NgModule({
  declarations: [
    HomeComponent,HomeSection1Component
  ],
  imports: [
    CommonModule
  ],
  exports:[HomeSection1Component]
})
export class HomeModule { }
