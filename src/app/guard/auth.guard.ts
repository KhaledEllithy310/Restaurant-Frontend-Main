import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorgeTokenService } from 'src/app/services/storge-token.service';

export const authGuard: CanActivateFn = (route, state) => {
    const token = new StorgeTokenService;
    if(token.getUser().user.role) {
      return true;
    } else {
      const route = new Router;
      route.navigate(['/home'])
      return false;
    }
};
