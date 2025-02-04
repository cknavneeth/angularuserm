import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginserviceService } from '../services/loginservice.service';
import { Router } from '@angular/router';
import { AdminservicesService } from '../services/adminservices.service';

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

export const adminauthorize:CanActivateFn=(route,state)=>{
  const adminservice=inject(AdminservicesService)
  const router=inject(Router)

  if(adminservice.adminauthorize()){
    router.navigate(['/admin/dashboard'])
    return false
  }
  return true
}
