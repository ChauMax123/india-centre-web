import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {BannerComponent} from "../shared/banner/banner.component";
import {WindowService} from '../services/window/window.service';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [
    NgOptimizedImage,
    BannerComponent,
    NgIf,
    FormsModule,
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {
  facilities = [
    { id: 1, name: 'Gym & Fitness Center', description: 'State-of-the-art equipment for your fitness needs.', imageUrl: 'assets/images/facility/gym.jpeg', pricePerHour: 10, pricePerDay: 50, disabledDates: ['2025-01-07', '2025-01-08']},
    { id: 2, name: 'Pond & Outdoor Area', description: 'Relax by the pond and enjoy nature.', imageUrl: 'assets/images/facility/pond.jpg', pricePerHour: 10, pricePerDay: 50, disabledDates: ['2025-01-07', '2025-01-08']},
    { id: 3, name: 'Sauna', description: 'Unwind and rejuvenate in our luxurious sauna.', imageUrl: 'assets/images/facility/sauna.jpeg',pricePerHour: 10, pricePerDay: 50, disabledDates: ['2025-01-07', '2025-01-08']},
    { id: 4, name: 'Guest House', description: 'Comfortable accommodations for visitors.', imageUrl: 'assets/images/facility/guest-house.jpeg',pricePerHour: 10, pricePerDay: 50, disabledDates: ['2025-01-07', '2025-01-08']},
    { id: 5, name: 'Celebration Hall', description: 'A spacious hall with a capacity for 250 people for events and celebrations.', imageUrl: 'assets/images/facility/celebration-hall.jpeg', pricePerHour: 10, pricePerDay: 50, disabledDates: ['2025-01-07', '2025-01-08']},
    { id: 6, name: 'Yoga & Meditation Room', description: 'Find your inner peace in our peaceful yoga space.', imageUrl: 'assets/images/facility/yoga-room.jpeg',pricePerHour: 10, pricePerDay: 50, disabledDates: ['2025-01-07', '2025-01-08']}
  ];

  viewMode: 'availability' | 'booking' | null = null;
  selectedFacility: any = null;
  availabilityDates = { startDate: '', endDate: '' };
  bookingDates = { startDate: '', endDate: '' };
  currentDate: string = new Date().toISOString().split('T')[0];
  isAuthenticated: boolean = false;

  constructor(private windowService: WindowService,
              private authService: AuthService,
              private router: Router,
              private http: HttpClient) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((status) => {
      this.isAuthenticated = status;
    });
    this.selectedFacility = this.facilities[0]; // Default to the first facility
  }

  showAvailability(facility: any) {
    this.selectedFacility = facility;
    this.viewMode = 'availability';
    window.scrollTo(0, 0); // Scroll to top
  }

  showBooking(facility: any) {
    this.selectedFacility = facility;
    this.viewMode = 'booking';
    window.scrollTo(0, 0); // Scroll to top
  }

  goBack() {
    this.viewMode = null;
    this.selectedFacility = null;
  }

  checkAvailability() {
    alert('Checking availability for ' + this.selectedFacility.name);
  }

  bookFacility() {
    const bookingData = {
      facilityId: this.selectedFacility.id,
      startDate: this.bookingDates.startDate,
      endDate: this.bookingDates.endDate,
    };
    this.http.post('/bookings', bookingData).subscribe((response: any) => {
      alert('Booking confirmed!');
    });
  }

  redirectToLogin() {
    this.router.navigate(['/signup']);
  }

  redirectToBooking() {
    if (!this.isAuthenticated) {
      this.redirectToLogin();
    } else {
      this.router.navigate(['/booking']);
    }
  }
  onFacilityChange() {
    // Handle the logic when a new facility is selected
    console.log('Facility changed to:', this.selectedFacility);
  }

  redirectToAvailability() {
    if (!this.isAuthenticated) {
      this.redirectToLogin();
    } else {
      this.router.navigate(['/availability']);
    }
  }

  onSubmit() {
    alert('Event booked successfully!');
  }
}
