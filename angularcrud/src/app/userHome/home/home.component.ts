import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  userEmail:string|null=''

  
  ngOnInit(): void {
      this.userEmail=localStorage.getItem('email')
  }
}
