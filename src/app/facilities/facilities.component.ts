import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {BannerComponent} from "../shared/banner/banner.component";
import {WindowService} from '../services/window.service';

@Component({
  selector: 'app-facilities',
  standalone: true,
    imports: [
        NgOptimizedImage,
        BannerComponent
    ],
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent {
  constructor(private windowService: WindowService) {
  }

  redirectToBooking() {
    const bookingUrl = `https://sunsportsinfra.com/facilities/book`;
    this.windowService.openWindow(bookingUrl);
  }

  redirectToAvailability() {
    const availabilityUrl = `https://sunsportsinfra.com/facilities/availability`;
    this.windowService.openWindow(availabilityUrl);
  }
}
