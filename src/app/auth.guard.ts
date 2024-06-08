import { CanActivateFn, Router } from '@angular/router';
import { PocketBaseService } from './pocketbase.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const pbs = inject(PocketBaseService)
  const router = inject(Router)
  
  if(!!pbs.token$.value){
    return true
  }
  router.navigate(['/login'])
  return false
};
