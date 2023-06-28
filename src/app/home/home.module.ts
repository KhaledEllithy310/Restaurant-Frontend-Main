import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { HomeSection1Component } from './home-section1/home-section1.component';
import { MeetOurTeamComponent } from './meet-our-team/meet-our-team.component';



@NgModule({
  declarations: [
    HomeComponent,HomeSection1Component,MeetOurTeamComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[HomeSection1Component,MeetOurTeamComponent]
})
export class HomeModule { }
