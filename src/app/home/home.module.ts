import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { HomeSection1Component } from './home-section1/home-section1.component';
import { MeetOurTeamComponent } from './meet-our-team/meet-our-team.component';
import { FooterComponent } from './footer/footer.component';
import { FeaturesSectionComponent } from './features-section/features-section.component';
import { AboutusSectionComponent } from './aboutus-section/aboutus-section.component';
import { CountnumberComponent } from './countnumber/CountnumberComponent';
import { ReviweComponent } from './reviwe/reviwe.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeSection1Component,
    MeetOurTeamComponent,
    FooterComponent,
    FeaturesSectionComponent,
    AboutusSectionComponent,
    
    CountnumberComponent,
          ReviweComponent,
  ],
  imports: [CommonModule],
  exports: [
    HomeSection1Component,
    MeetOurTeamComponent,
    FooterComponent,
    CountnumberComponent,
  ],
})
export class HomeModule {}
