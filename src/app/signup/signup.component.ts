import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { environment } from '../../environments/environment';
import { LocalStorageService } from '../shared/storage/local.storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isSignUp = true; // Track whether it's signup or login
  authData = {
    name: '',
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  toggleForm() {
    this.isSignUp = !this.isSignUp;
  }

  onSubmit() {
    if (this.isSignUp) {
      this.signup();
    } else {
      this.login();
    }
  }

  signup() {
    const signupData = { ...this.authData };

    this.http.post(`${environment.backendUrl}/auth/signup`, signupData).subscribe({
      next: () => {
        console.log('Signup successful');
        alert('Signup successful! Please login.');
        this.errorMessage = '';
        this.clearAuthData(); // Clear the form after successful signup
      },
      error: (err) => {
        this.errorMessage =
          err.error && err.error.error === 'User already exists'
            ? 'User already exists! Please login instead.'
            : 'An error occurred. Please try again.';
      }
    });
  }

  login() {
    const loginData = { ...this.authData }; // Copying authData for clarity

    this.http.post(`${environment.backendUrl}/auth/signin`, loginData, { headers }).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        this.authService.login(response.token); // Store the token and set user as logged in
        this.router.navigate(['/home']); // Redirect to home page
        this.clearAuthData();
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }

  private clearAuthData() {
    this.authData = {
      name: '',
      email: '',
      password: ''
    };
  }
}
