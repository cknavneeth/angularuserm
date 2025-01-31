import { ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteUser, getallusers } from '../../store/admin/adminaction';
import { Observable } from 'rxjs';
import { selectadmin, selectadminerror, selectadminloading } from '../../store/admin/adminselector';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { IUser } from '../../../shared/usermodel';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // ✅ Import MatDialog

@Component({
  selector: 'app-admindashboard',
  imports: [CommonModule, AddUserComponent, EditUserComponent,MatDialogModule],
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit{
    

  private store=inject(Store)
  private dialog = inject(MatDialog);
 

  users:Observable<any[]>=this.store.select(selectadmin)
  error:Observable<string|null>=this.store.select(selectadminerror)
  loading:Observable<boolean>=this.store.select(selectadminloading)

  addUsershowmodal!:boolean
  editUsershowmodal!:boolean
  usertoEdit!:IUser
  
  ngOnInit(): void {
      this.store.dispatch(getallusers())
  }

 

  addUser(){
     this.addUsershowmodal=true
  }

  closeAddUser(event:boolean){
    this.addUsershowmodal=event
  }

  closeEditUser(event:boolean){
    this.editUsershowmodal=event
  }

  editUser(user:IUser){
    this.usertoEdit=user
    this.editUsershowmodal=true
  }

  // deleteUser(email:string){
  //    this.store.dispatch(deleteUser({email}))
  // }

  openDeleteConfirmation(email: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { // ✅ Use injected dialog
      width: '300px',
      data: { message: 'Are you sure you want to delete this user?' }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.store.dispatch(deleteUser({ email })); 
        this.store.dispatch(getallusers());
       
      }
    });
  }


  
}
