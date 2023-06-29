import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { HomeSection1Component } from './home-section1/home-section1.component';
import { MeetOurTeamComponent } from './meet-our-team/meet-our-team.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'  
import { GuestbookComponent } from './guestbook/guestbook.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    HomeComponent,HomeSection1Component,MeetOurTeamComponent, GuestbookComponent,FooterComponent
  ],
  imports: [
    CommonModule,  FontAwesomeModule
  ],
  exports:[HomeSection1Component,MeetOurTeamComponent, GuestbookComponent ,FooterComponent]
})
export class HomeModule { }
