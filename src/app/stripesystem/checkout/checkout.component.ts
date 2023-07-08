import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Stipesystem } from '../stipesystem';
import { NgForm } from '@angular/forms';
import { StripepaymentService } from 'src/app/services/stripepayment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  $checkout!:Observable<Stipesystem>;

  constructor(private paymentService:StripepaymentService){}

  ngOnInit():void{
    // this.$checkout= this.paymentService.getMembership();
  }

  onSubmit(f:NgForm){
    // this.paymentService.requestMemberSession();
  }
}
