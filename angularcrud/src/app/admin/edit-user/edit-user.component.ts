import { Component, EventEmitter, Input, input, OnInit, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../../shared/usermodel';
import { editUser, getallusers } from '../../store/admin/adminaction';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-edit-user',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit{

  edituserform!:FormGroup

  @Input() currentUser!:IUser

  @Output() closeModalEvent = new EventEmitter<boolean>();

  constructor(private fb:FormBuilder ,private store:Store){
    this.edituserform=this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required]],
    })
  }

closeModal(){
   this.closeModalEvent.emit(false)
}


ngOnInit(): void {
    if(this.currentUser){
      this.edituserform.patchValue(this.currentUser)
    }
}

 onSubmit(){
     if(this.edituserform.valid){
      const updatedUser={_id:this.currentUser._id,...this.edituserform.value}
      this.store.dispatch(editUser({user:updatedUser}))
      this.closeModal()
      this.store.dispatch(getallusers())
     }else{
      this.edituserform.markAllAsTouched()
     }
 }
}
