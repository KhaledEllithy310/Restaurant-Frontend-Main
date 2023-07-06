import { CanActivateFn, Router } from '@angular/router';
import { StorgeTokenService } from '../services/storge-token.service';

export const cashierGuard: CanActivateFn = (route, state) => {
  const token = new StorgeTokenService;
  if(token.getUser().user.role === 'Cashier') {
    return true;
  } else {
    const route = new Router;
    route.navigate(['/home'])
    return false;
  }
};
