import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginserviceService } from '../services/loginservice.service';
import { Router } from '@angular/router';

export const isNotAuth: CanActivateFn = (route, state) => {
  const loginservice=inject(LoginserviceService)
  const router=inject(Router)

  if(!loginservice.isAuthenticated()){
    router.navigate(['/login'])
    return false
  }
  return true
};

export const authorizing:CanActivateFn=(route,state)=>{
  const loginservice=inject(LoginserviceService)
  const router =inject (Router)
  if(loginservice.isAuthenticated()){
    router.navigate(['/home'])
    return false
  }
  return true
}
