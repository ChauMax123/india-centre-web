import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {Router, NavigationEnd, RouterLink, RouterLinkActive} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    AsyncPipe,
    NgIf,
  ],
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isLoggedIn$!: Observable<boolean>;
  private routerSubscription!: Subscription;
  lastScrollTop = 0;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isAuthenticated();

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMenuOpen = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    const header = document.querySelector('header');

    if (!header) return;

    if (currentScroll > this.lastScrollTop) {
      header.style.padding = '0px 20px';
    } else {
      header.style.padding = '10px 20px';
    }

    this.lastScrollTop = Math.max(currentScroll, 0);
  }
}
