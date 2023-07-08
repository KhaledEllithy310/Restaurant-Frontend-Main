import { StripepaymentService } from 'src/app/services/stripepayment.service';
import Swal from 'sweetalert2';
import { OrderService } from './../../services/order.service';
import { TablesService } from 'src/app/services/tables.service';
import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  tables!: any[];
  TableNumber: any;
  showOrders: boolean = false;
  ordersTable: any[] = [];
  orderId!:number;
  totalPrice!:number
  @ViewChild('tablesWaiterOrders', { static: false })
  tablesWaiterOrders!: ElementRef;

  constructor(
    private tablesService: TablesService,
    private elementRef: ElementRef,
    private orderService: OrderService,
    private payment:StripepaymentService,
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
    let orderTableObject = {};
    this.ordersTable =[];

    this.orderService.getServedOrderByTableId(id_table).subscribe(
      (response: any) => {
        this.orderId=response.data[0]['id'];
        this.totalPrice = response.data[0]['total_price'];

        console.log(response.data[0].products);
        this.ordersTable = response.data[0].products;
        console.log('ordersTable:', this.ordersTable);


      },
      (err) => {
        console.log(err);
      }
    );
  }

  makeOrderPaid()
  {
    this.orderService.makeOrderPaid(this.orderId,{"method":'CASH'}).subscribe((respone:any)=>{
      Swal.fire({
        title: 'Payment',
        text: respone.message,
        icon: 'success'
      });
    })
  }

  closeOrderTable() {
    this.showOrders = false;
  }

  paymentByVisa()
  {
    this.payment.requestMemberSession(this.totalPrice,this.orderId);
    this.payment.getMembership().subscribe((response:any)=>{
      console.log(response);
      
  })

  }
}
