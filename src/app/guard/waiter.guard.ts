import { CanActivateFn, Router } from '@angular/router';
import { StorgeTokenService } from '../services/storge-token.service';

export const waiterGuard: CanActivateFn = (route, state) => {
  const token = new StorgeTokenService;
  if(token.getUser().user.role === 'Waiter') {
    return true;
  } else {
    const route = new Router;
    route.navigate(['/home'])
    return false;
  }
};
