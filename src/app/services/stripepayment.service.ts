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
  constructor(private http:HttpClient) { }

  getMembership():Observable<Stipesystem>{
    return of({
      id: 'prod_ODhSkxQqMI76JM',
      priceId:'price_1NRG3ZITSBNqz237qpKiJ6u3',
      name:'Doa',
      price:'50',
      features:['up to 5 users','basic support']
    });

  }

  requestMemberSession(priceId:string):void{
    this.http.post<ISession>(this.baseUrl ,{
      priceId:priceId,
      successUrl: 'http://localhost:4200/success',
      failureUrl: 'http://localhost:4200/failure',
    }).subscribe((session)=>{
      this.redirectToCheckout(session.sessionId);
    })
  }

  redirectToCheckout(sessionId:string){
    const stripe = Stripe('pk_test_51NPPPpITSBNqz237y4RHbePnBFdR3asSmEgP0Wcg4ZplRUM5RfTISWu739wb5amnsEeEKZNUal1wFB6rgSByoywH00Vjm5a533');
    stripe.redirectToCheckout({
      sessionId:sessionId,                                                                                                                                                          
    })
  }
}
