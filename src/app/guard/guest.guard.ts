import { CanActivateFn, Router } from '@angular/router';
import { StorgeTokenService } from '../services/storge-token.service';

export const guestGuard: CanActivateFn = (route, state) => {
    const token = new StorgeTokenService;
    if(token.getUser()) {

      const route = new Router;
      route.navigate(['/home'])
      return false;
    
    } else {
      
      return true;
    }
};
