import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  scrollToTop(): void {
    if (this.isBrowser()) {
      window.scrollTo(0, 0);
    }
  }

  openWindow(url: string, target: string = '_blank', features: string = ''): Window | null {
    if (this.isBrowser()) {
      return window.open(url, target, features);
    }
    return null;
  }

}
