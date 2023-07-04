import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { TextMutedPipe } from '../pipes/text-muted.pipe';

@NgModule({
  declarations: [NavbarComponent, TextMutedPipe],
  imports: [CommonModule, AppRoutingModule],
  exports: [NavbarComponent, TextMutedPipe],
})
export class SharedModule {}
