import { ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteUser, getallusers } from '../../store/admin/adminaction';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
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


  private searchTerm=new BehaviorSubject<string>('')

  filteredUser$: Observable<any[]> = combineLatest([this.users, this.searchTerm]).pipe(
    map(([users, term]: [IUser[], string]) => {
      if (!users) return []; // Ensure users is an array
      if (!term) return users;
  
      return users.filter(user =>
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase())
      );
    })
  );
  
  

 
  
  ngOnInit(): void {
      this.store.dispatch(getallusers())
  }


  onSearch(value:Event){
    const inputElement = value.target as HTMLInputElement; // Type assertion here
    const searchTerm = inputElement.value;
    console.log(searchTerm); 
    this.searchTerm.next(searchTerm); 
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { 
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
