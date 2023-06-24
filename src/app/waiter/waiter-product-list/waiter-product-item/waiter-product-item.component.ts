import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-waiter-product-item',
  templateUrl: './waiter-product-item.component.html',
  styleUrls: ['./waiter-product-item.component.css'],
})
export class WaiterProductItemComponent {
  @Input() item: any = {};
}
