import { Component, Input, EventEmitter,  Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-countnumber',
  templateUrl: './countnumber.component.html',
  styleUrls: ['./countnumber.component.css']
})
export class CountnumberComponent  {
  projectcount:number = 0;
  clientcount:number =0;
  coffecups:number =0;
  sushitypes:number = 0;
  projectcountstop:any = setInterval(()=>{
    this.projectcount ++;
    if(this.projectcount ==200)
    {
      clearInterval(this.projectcountstop);
    }
  },50)

  clientcountstop:any = setInterval(()=>{
    this.clientcount ++;
    if(this.clientcount ==180)
    {
      clearInterval(this.clientcountstop);
    }
  },50)

  coffecupsstop:any = setInterval(()=>{
    this.coffecups ++;
    if(this.coffecups==350)
    {
      clearInterval(this.coffecupsstop);
    }
  },50)
  sushitypesstop:any = setInterval(()=>{
    this.sushitypes ++;
    if(this.sushitypes==20)
    {
      clearInterval(this.sushitypesstop);
    }
  },50)
 
}


