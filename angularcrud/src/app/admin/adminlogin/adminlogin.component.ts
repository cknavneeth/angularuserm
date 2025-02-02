import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { adminLogin } from '../../store/admin/adminaction';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { selectadminerror } from '../../store/admin/adminselector';

@Component({
  selector: 'app-adminlogin',
  imports: [CommonModule,ReactiveFormsModule,],
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.scss'
})
export class AdminloginComponent implements OnInit{
  private store = inject(Store)
  error$ = this.store.select(selectadminerror);
  adminloginform!:FormGroup
  constructor(private fb:FormBuilder){}
  ngOnInit(): void {
   this.adminloginform= this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
   })  
  }

  onSubmit(){
    console.log('hello hello', this.adminloginform.value)
    if(this.adminloginform.valid){
      const {email,password}=this.adminloginform.value
      console.log(email,password)
      this.store.dispatch(adminLogin({admin:{email,password}}))
    }
  }
}
