import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const token = localStorage.getItem('access_token');
      if (token) {
        this.isAuthenticatedSubject.next(true);
      }
    }
  }

  login(token: string) {
    if (this.isBrowser) {
      localStorage.setItem('access_token', token);
      this.isAuthenticatedSubject.next(true);
    }
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('access_token');
      this.isAuthenticatedSubject.next(false);
    }
  }

  isAuthenticated() {
    return this.isAuthenticatedSubject.asObservable();
  }
}
