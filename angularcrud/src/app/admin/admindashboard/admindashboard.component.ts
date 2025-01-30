import { Component, EventEmitter, inject, OnInit, Output, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { getallusers } from '../../store/admin/adminaction';
import { Observable } from 'rxjs';
import { selectadmin, selectadminerror, selectadminloading } from '../../store/admin/adminselector';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-admindashboard',
  imports: [CommonModule, AddUserComponent],
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit{
    

  private store=inject(Store)

  users:Observable<any[]>=this.store.select(selectadmin)
  error:Observable<string|null>=this.store.select(selectadminerror)
  loading:Observable<boolean>=this.store.select(selectadminloading)

  addUsershowmodal!:boolean
  editUsershowmodal!:boolean
  ngOnInit(): void {
      this.store.dispatch(getallusers())
  }

 

  addUser(){
     this.addUsershowmodal=true
  }

  closeAddUser(event:boolean){
    this.addUsershowmodal=event
  }
  
}
