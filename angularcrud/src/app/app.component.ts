import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from './userRegister/signup/signup.component';
import {HttpClient } from '@angular/common/http'; 
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { LoginComponent } from './userLogin/login/login.component';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angularcrud';
}
