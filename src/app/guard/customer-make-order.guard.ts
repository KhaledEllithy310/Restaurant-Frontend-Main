import { CanActivateFn, Router, ActivatedRoute } from '@angular/router';

export const customerMakeOrderGuard: CanActivateFn = (route, state) => {

  const itemString = localStorage.getItem('Reservation_Info');
  const Activeroute =  new ActivatedRoute

  if(itemString){
  const item = JSON.parse(itemString);

  if (item.expiration < new Date().getTime()) {
    localStorage.removeItem('Reservation_Info');
    const router = new Router;
    router.navigate(["'customer/tablesForbook'"], { relativeTo: Activeroute });
    return false;
  } else {
    const value = item.value;
    console.log(value);
    return true;
  }
    }else{
    const router = new Router;
    router.navigate(["'customer/tablesForbook'"], { relativeTo: Activeroute });
    return false;
    }

};
