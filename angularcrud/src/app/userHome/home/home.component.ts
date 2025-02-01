import { Component, inject, OnInit } from '@angular/core';
import { LoginserviceService } from '../../services/loginservice.service';
import { CloudinaryserviceService } from '../../services/cloudinaryservice.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  userEmail:string|null=''

  selectedFile: File | null = null;
  uploadedImageUrl: string | null = null; 
  private cloudinaryService = inject(CloudinaryserviceService);
  private http = inject(HttpClient);
 
 

  private loginservice=inject(LoginserviceService)
  ngOnInit(): void {
      this.userEmail=localStorage.getItem('email')
      this.fetchUserProfileImage();
  }

  //fetching image
  fetchUserProfileImage() {
    this.http.get<{ profileImage: string }>(`${environment.apiurl}/getProfileImage?email=${this.userEmail}`)
      .subscribe(
        (response) => {
          this.uploadedImageUrl = response.profileImage; // Set image URL
        },
        (error) => {
          console.error('Error fetching profile image:', error);
        }
      );
  }

  //fetching image


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    if (this.selectedFile) {
      this.cloudinaryService.uploadImage(this.selectedFile).subscribe(
        (response: any) => {
          const imageUrl = response.secure_url;
          this.saveImageUrlToMongoDB(imageUrl);
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }
  
  // saveImageUrlToMongoDB(imageUrl: string): void {
  //   const userData = {
  //     email: this.userEmail,
  //     profileImage: imageUrl
  //   };
  
  //   this.http.post(`${environment.apiurl}/saveProfileImage`, userData).subscribe(
  //     (response) => {
  //       console.log('Profile image URL saved to MongoDB:', response);
  //     },
  //     (error) => {
  //       console.error('Error saving profile image URL to MongoDB:', error);
  //     }
  //   );
  // }
  


  saveImageUrlToMongoDB(imageUrl: string): void {
    const userData = {
      email: this.userEmail,
      profileImage: imageUrl
    };
  
    this.http.post(`${environment.apiurl}/saveProfileImage`, userData, { responseType: 'json' }).subscribe(
      (response) => {
        console.log('Profile image URL saved to MongoDB:', response);
      },
      (error) => {
        console.error('Error saving profile image URL to MongoDB:', error.error || error);
      }
    );
  }

  
}
