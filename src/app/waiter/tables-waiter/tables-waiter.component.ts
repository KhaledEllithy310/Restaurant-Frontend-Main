import Swal from 'sweetalert2';
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
  orderId!: number;
  constructor(
    private tablesService: TablesService,
    private elementRef: ElementRef,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.getAvailableTables();
  }

  getAvailableTables() {
    this.tablesService.getActiveTable().subscribe(
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
    this.ordersTable = [];

    this.orderService.getOrderTable(id_table).subscribe(
      (response: any) => {
        this.orderId = response.data[0]['id'];
        this.ordersTable = response.data[0].products;
        console.log('ordersTable:', this.ordersTable);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  changeStatus() {
    this.orderService
      .makeOrderServerd(this.orderId)
      .subscribe((respone: any) => {
        this.ordersTable = [];
        Swal.fire({
          title: 'Served',
          text: respone.message,
          icon: 'success',
        });
      });
  }

  closeOrderTable() {
    this.showOrders = false;
  }
}
