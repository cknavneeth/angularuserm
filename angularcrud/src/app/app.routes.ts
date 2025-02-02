import { Routes } from '@angular/router';
import { SignupComponent } from './userRegister/signup/signup.component';
import { LoginComponent } from './userLogin/login/login.component';
import { HomeComponent } from './userHome/home/home.component';
import { authorizing, isNotAuth } from './guards/auth-guard.guard';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';

export const routes: Routes = [
   {
    path:'signup',
    component:SignupComponent,
    canActivate:[authorizing]
   },
   {
    path:'login',
    component:LoginComponent,
    canActivate:[authorizing] 
   },
   {
      path:'home',
      component:HomeComponent,
      // canActivate:[isNotAuth]
      
   },
   {
      path:'admin/login',
      component:AdminloginComponent
   },{
      path:'admin/dashboard',
      component:AdmindashboardComponent
   }

];
   