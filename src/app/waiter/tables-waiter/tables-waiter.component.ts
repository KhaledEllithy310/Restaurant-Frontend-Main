import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TablesService } from 'src/app/services/tables.service';
import { OrderService } from './../../services/order.service';

@Component({
  selector: 'app-tables-waiter',
  templateUrl: './tables-waiter.component.html',
  styleUrls: ['./tables-waiter.component.css'],
})
export class TablesWaiterComponent {
  tables!: any[];
  TableNumber: any;
  showOrders: boolean = false;
  ordersTable: any[] = [];
  @ViewChild('tablesWaiterOrders', { static: false })
  tablesWaiterOrders!: ElementRef;

  constructor(
    private tablesService: TablesService,
    private elementRef: ElementRef,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.getAvailableTables();
  }

  getAvailableTables() {
    this.tablesService.getAvailableTable().subscribe(
      (response: any) => {
        console.log(response);
        this.tables = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showOrderTable(table: any) {
    this.showOrders = true;
    this.TableNumber = table.number;
    this.getOrderTable(table.id);
  }

  @HostListener('window:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.showOrders = false;
    }
  }

  getOrderTable(id_table: any) {
    let orderTableObject = {};
    this.orderService.getOrderTable(id_table).subscribe(
      (response: any) => {
        console.log(response);
        for (let i = 0; i < response.data[0].products.length; i++) {
          for (let j = 0; j < response.data[0].order_products.length; j++) {
            orderTableObject = {
              name: response.data[0].products[i].name,
              image: response.data[0].products[i].image,
              quantity: response.data[0].order_products[j].quantity,
              totalPrice: response.data[0].order_products[j].total_price,
            };
          }
        }
        this.ordersTable.push(orderTableObject);
        console.log(this.ordersTable);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
