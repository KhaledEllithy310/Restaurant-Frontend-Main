import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-ingridents',
  templateUrl: './add-ingridents.component.html',
  styleUrls: ['./add-ingridents.component.css'],
})
export class AddIngridentsComponent {
  @Input() showForm!: boolean;
}
