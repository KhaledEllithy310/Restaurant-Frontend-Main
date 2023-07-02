import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { HomeSection1Component } from './home-section1/home-section1.component';
import { MeetOurTeamComponent } from './meet-our-team/meet-our-team.component';
import { GuestbookComponent } from './guestbook/guestbook.component';
import { FooterComponent } from './footer/footer.component';
import { FeaturesSectionComponent } from './features-section/features-section.component';
import { AboutusSectionComponent } from './aboutus-section/aboutus-section.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CountnumberComponent } from './countnumber/CountnumberComponent';

@NgModule({
  declarations: [
    HomeComponent,
    HomeSection1Component,
    MeetOurTeamComponent,
    GuestbookComponent,
    FooterComponent,
    FeaturesSectionComponent,
    AboutusSectionComponent,
    ReservationComponent,
    CountnumberComponent,
  ],
  imports: [CommonModule],
  exports: [
    HomeSection1Component,
    MeetOurTeamComponent,
    GuestbookComponent,
    FooterComponent,
    ReservationComponent,
    CountnumberComponent,
  ],
})
export class HomeModule {}
