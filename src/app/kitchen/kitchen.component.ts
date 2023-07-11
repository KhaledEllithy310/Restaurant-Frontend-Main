import { Component, Inject } from '@angular/core';
import { KitchenService } from 'src/app/services/kitchen.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css'],
})
export class KitchenComponent {
  orders: any;
  count: any;
  completedSuccess: any;
  errorComplete: any;
  canceledSuccess: any;
  errorCanceled: any;
  comleteOrderSuccess: any;
  completeOrderError: any;

  constructor( private kitchen: KitchenService) {}

  ngOnInit() {
    this.kitchen.getOrders().subscribe({
      next: (res: any) => {
        this.orders = res.data;
        console.log(this.orders);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  //     setTimeout(() => {
  //   this.ngOnInit();
  // }, 10000);

  getQuantity(productId: number, orderProducts: any[]) {
    const product = orderProducts.find((p) => p.product_id === productId);
    return product ? product.quantity : 0;
  }

  getExtra(productId: number, orderProducts: any[]) {
    const product = orderProducts.find((p) => p.product_id === productId);
    return product ? product.extra : null;
  }

  getOrderProductId(productId: number, orderProducts: any[]) {
    const orderProduct = orderProducts.find(
      (op) => op.product_id === productId
    );
    return orderProduct ? orderProduct.id : null;
  }

  getOrderStatus(orderProducts: any[]) {
    const completedProducts = orderProducts.filter(
      (op: { status: string }) => op.status === 'Complete'
    );
    return completedProducts;
  }
  getOrderProductStatus(orderProducts: any[], productId: number) {
    const orderProduct = orderProducts.find(
      (op) => op.product_id === productId
    );
    return orderProduct ? orderProduct.status : null;
  }

  complete(orderID: any, orderProductID: any) {
    this.kitchen.completed(orderID, orderProductID).subscribe({
      next: (res: any) => {
        this.completedSuccess = res;
        console.log(res);
        Swal.fire('Completed Product!','', 'success');

        const order = this.orders.find((o: any) => o.id === orderID);
        const orderProduct = order.order_products.find(
          (op: any) => op.id === orderProductID
        );
        if (orderProduct) {
          orderProduct.status = 'Complete'; // update the status in the local data
          this.getOrderStatus(order.order_products); // update the completed products count
        }
      },
      error: (err: any) => {
        this.errorComplete = err.errors.error;
        console.log(err);
      }
    })
    this.ngOnInit();
  }

  canceledOrder(orderID: any, orderProductID: any) {
    this.kitchen.canceled(orderID, orderProductID).subscribe({
      next: (res: any) => {
        this.canceledSuccess = res;
        console.log(res);
        Swal.fire('Canceled Product!', '', 'error');

        const order = this.orders.find((o: any) => o.id === orderID);
        const orderProduct = order.order_products.find(
          (op: any) => op.id === orderProductID
        );
        if (orderProduct) {
          orderProduct.status = 'Canceled'; // update the status in the local data
          this.getOrderStatus(order.order_products); // update the completed products count
        }
      },
      error: (err: any) => {
        this.errorCanceled = err.errors.error;
        console.log(err);
      }
    })
    this.ngOnInit();
  }
  completeOrder(orderID: any) {
    this.kitchen.completeOrder(orderID).subscribe({
      next: (res: any) => {
        this.comleteOrderSuccess = res;
        console.log(this.comleteOrderSuccess);
        Swal.fire('Order Is Done!', '', 'success');
        this.ngOnInit();
      },
      error: (err: any) => {
        this.completeOrderError = err.error.message;
        console.log(err);
        Swal.fire('Not Completed Order', this.completeOrderError, 'error');
      },
    });
  }
}
