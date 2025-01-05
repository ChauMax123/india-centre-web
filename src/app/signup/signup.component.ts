import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { environment } from '../../environments/environment';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  standalone: true
})
export class SignupComponent {
  isSignUp = true;
  signUpForm: FormGroup;
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    // Define the signUpForm with validation
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'),
        ],
      ],
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  toggleForm() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = '';
  }

  onSignUpSubmit() {
    if (this.signUpForm.valid) {
      this.signup();
    }
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.login();
    }
  }

  signup() {
    const signupData = this.signUpForm.value;

    this.http
      .post(`${environment.backendUrl}/auth/signup`, signupData, { responseType: 'text' })
      .subscribe({
        next: () => {
          alert('Signup successful! Please login.');
          this.signUpForm.reset();
          this.isSignUp = false;
        },
        error: (err) => {
          this.errorMessage =
            err.status === 409
              ? 'User already exists! Please login instead.'
              : 'An error occurred. Please try again.';
        },
      });
  }

  login() {
    const loginData = this.loginForm.value;

    this.http.post(`${environment.backendUrl}/auth/signin`, loginData).subscribe({
      next: (response: any) => {
        this.authService.login(response.token);
        this.router.navigate(['/home']);
        this.loginForm.reset();
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage =
          err.status === 401
            ? 'Invalid email or password. Please try again.'
            : 'An error occurred. Please try again.';
      },
    });
  }
}
