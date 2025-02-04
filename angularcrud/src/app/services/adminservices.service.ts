import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from '../../shared/usermodel';

@Injectable({
  providedIn: 'root'
})
export class AdminservicesService {
  private api:string='http://localhost:4300/admin'
  private http=inject(HttpClient)
  constructor(private jwtHelper:JwtHelperService) { }


  adminLogin(admin:{email:string,password:string}){
    console.log('service ethiyallo')
    return this.http.post<{token: string}>(`${this.api}/login`,admin)
  }

  getallusers(){
    console.log('usersine vende nink')
    return this.http.get<{users:any[]}>(`${this.api}/dashboard`)
  }

  addUser(user:IUser){
    console.log('admin add cheyyan ponu')
    return this.http.post<{user:IUser}>(`${this.api}/adduser`,user)

  }

  editUser(user:{_id:string,name:string,email:string,password:string}){
      console.log('edit cheyyanulla call varum')
      return this.http.put(`${this.api}/edituser`,user)
  }

  deleteUser(email:string){
    console.log('service for delete')
    return this.http.put(`${this.api}/deleteuser`,{email})
  }


  adminauthorize(){
   const adminToken= localStorage.getItem('admintoken')
    return adminToken? !this.jwtHelper.isTokenExpired(adminToken):false
  }
  
}
