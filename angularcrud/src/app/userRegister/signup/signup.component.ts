import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  templateUrl: './signup.component.html',

  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  // ngOnInit(): void {
  //   console.log('SignupComponent initialized!'); // Add this log
  // }
  registrationForm!: FormGroup;
  registrationError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private loginservice: LoginserviceService,
    private store:Store
  ) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
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
  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): { [key: string]: boolean } | null => {
    const password = group.get('password')?.value;
    const cpassword = group.get('cpassword')?.value;
    return password === cpassword ? null : { notSame: true };
  };

  onSubmit() {
    console.log('lll');
    
     this.store.dispatch(userRegistration({user: this.registrationForm.value}))
  }
}
