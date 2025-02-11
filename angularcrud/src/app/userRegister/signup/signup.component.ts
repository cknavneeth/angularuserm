import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoginserviceService } from '../../services/loginservice.service';
import { Store } from '@ngrx/store';
import { userRegistration } from '../../store/action';
import { Observable } from 'rxjs';
import { selectError } from '../../store/selector';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    RouterModule
  ],
  templateUrl: './signup.component.html',

  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  // ngOnInit(): void {
  //   console.log('SignupComponent initialized!'); // Add this log
  // }
  private _store = inject(Store)
  error$: Observable<string| null > = this._store.select(selectError)
  registrationForm!: FormGroup;
  registrationError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private loginservice: LoginserviceService,
    // private store:Store
  ) {

  }


  
  ngOnInit(): void {
    this.registrationForm = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z\s]+$/)
        ]),

        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/),
        ]),
        cpassword: new FormControl('', [Validators.required]),
      },
      { validators: this.checkPasswords }
    );
  }

  //creating a validator to match passwords
  // checkPasswords: ValidatorFn = (
  //   group: AbstractControl
  // ): { [key: string]: boolean } | null => {
  //   const password = group.get('password')?.value;
  //   const cpassword = group.get('cpassword')?.value;
  //   if(password!==cpassword){
  //     group.get('cpassword')?.setErrors({notSame:true})
  //   }
  //   else{
  //     group.get('cpassword')?.setErrors(null)
  //   }
  // };
  checkPasswords: ValidatorFn = (group: AbstractControl): null => {
    const password = group.get('password')?.value;
    const cpassword = group.get('cpassword')?.value;

    if (password !== cpassword) {
        group.get('cpassword')?.setErrors({ notSame: true }); // Set error only on "cpassword"
    } else {
        group.get('cpassword')?.setErrors(null); // Clear error if passwords match
    }
    
    return null; // Don't return an error for the form group
};


  onSubmit() {
    console.log('lll');
    
     this._store.dispatch(userRegistration({user: this.registrationForm.value}))
  }
}
