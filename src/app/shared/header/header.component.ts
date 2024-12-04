import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen: boolean = false;
  private routerSubscription!: Subscription;
  lastScrollTop: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
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

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;

    // If scrolling down, reduce the header padding
    if (currentScroll > this.lastScrollTop) {
      document.querySelector('header')?.setAttribute('style', 'padding: 0px 20px');
    } else {
      // If scrolling up, restore the header padding
      document.querySelector('header')?.setAttribute('style', 'padding: 10px 20px');
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
}
