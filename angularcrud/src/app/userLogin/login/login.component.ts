import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { userLogin } from '../../store/action';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { selectError } from '../../store/selector';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
loginForm!:FormGroup

private store=inject(Store)

error$:Observable<string|null>=this.store.select(selectError)

constructor(private formBuilder:FormBuilder,
  // private store:Store
){}
  

ngOnInit(): void {
  this.loginForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
  })
}


onSubmit(){
  if(this.loginForm.valid){
    const {email,password}=this.loginForm.value
    this.store.dispatch(userLogin({user:{email,password}}))
  }
}

}
