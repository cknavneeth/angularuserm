import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IUser } from '../../../shared/usermodel';
import { addUser, getallusers } from '../../store/admin/adminaction';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit{
  
  adminaddform!:FormGroup

  constructor(private fb:FormBuilder,private store:Store){}

  ngOnInit(): void {
   
    this.adminaddform=this.fb.group({
      name:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]]
    })

    this.adminaddform.setValidators(this.passwordMatchValidator);
  }

  @Output() closeModalEvent=new EventEmitter<boolean>()

  closeModal(){
    this.closeModalEvent.emit(false)
  }

  passwordMatchValidator(control:AbstractControl):ValidationErrors|null{
    const password=control.get('password')
    const confirmPassword=control.get('confirmPassword')

    if(password&&confirmPassword&&password.value!==confirmPassword.value){
      return {mismatch:true}
    }
    return null
  }

  onSubmit(){
    if(this.adminaddform.valid){
      const formvalues=this.adminaddform.value

      const user:IUser={
         name:formvalues.name,
         email:formvalues.email,
         password:formvalues.password
         
      }
      this.store.dispatch(addUser({user}))
      this.closeModal()
      this.store.dispatch(getallusers())
    }else{
      this.adminaddform.markAllAsTouched()
    }
  }

  
 


}
