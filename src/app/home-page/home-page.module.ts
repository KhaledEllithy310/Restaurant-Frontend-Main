import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSectionComponent } from './home-section/home-section.component';
import { FeaturesSectionComponent } from './features-section/features-section.component';
import { HomePageComponent } from './home-page.component';
import { AboutusSectionComponent } from './aboutus-section/aboutus-section.component';

@NgModule({
  declarations: [
    HomeSectionComponent,
    FeaturesSectionComponent,
    HomePageComponent,AboutusSectionComponent
  ],
  imports: [CommonModule],
  exports: [HomeSectionComponent],
})
export class HomePageModule {}
