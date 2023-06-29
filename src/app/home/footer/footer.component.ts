import { Component, Input } from '@angular/core';
import { faCoffee  } from '@fortawesome/free-solid-svg-icons';                //import icon

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  template: '<fa-icon [icon]="icon"></fa-icon>'
})
export class FooterComponent {
  // @Input() icon: any = faIcon;
  faCoffee =faCoffee

 
}
