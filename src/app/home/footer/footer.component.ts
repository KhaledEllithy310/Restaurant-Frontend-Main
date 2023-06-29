import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  template: '<fa-icon [icon]="icon"></fa-icon>'
})
export class FooterComponent {
  // @Input() icon: any = faIcon;


}
