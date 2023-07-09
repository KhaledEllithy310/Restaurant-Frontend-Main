import Swal  from 'sweetalert2';
import { OrderService } from './order.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISession, Stipesystem } from '../stripesystem/stipesystem';

declare const Stripe:any;

@Injectable({
  providedIn: 'root'
})
export class StripepaymentService {

  baseUrl: string = 'http://127.0.0.1:8000/api/CreateCheckoutSession';
  constructor(private http:HttpClient , private OrderService:OrderService) { }

  getMembership():Observable<Stipesystem>{
    return of({
      name:'Doass'
    });

  }

  requestMemberSession(price:number,id:number):void{
    this.http.post<ISession>(this.baseUrl ,{
      successUrl: 'http://localhost:4200/cashier/ShowOrders',
      failureUrl: 'http://localhost:4200/failure',
      price:price
    }).subscribe((session)=>{

      this.OrderService.makeOrderPaid(id,{"method":'VISA'}).subscribe((response:any)=>{
        // Swal.fire({
        //   title: 'Payment',
        //   text: response.message,
        //   icon: 'success'
        // });
      });



    })
  }

  redirectToCheckout(sessionId:string){
    const stripe = Stripe('pk_test_51NRf1NKiafEVL17xe3jHWeaz7lc0FmxDSFUxIAzaEmjYQTS7TRCO1R4Lxg5A66aOjHhHEaPbnEJHPgNFcDPdPZaM00YzYzABDe');
    stripe.redirectToCheckout({
      sessionId:sessionId,
    })
  }
}
