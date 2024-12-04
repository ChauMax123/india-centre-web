import {Component, OnInit} from '@angular/core';
import {EventsService} from '../services/events.service';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BannerComponent} from '../shared/banner/banner.component';
import {RouterLink} from '@angular/router';
import {WindowService} from '../services/window.service';

interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    BannerComponent,
    RouterLink
  ],
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  selectedEventType: string = 'Upcoming';
  filteredEvents: Event[] = [];

  constructor(private eventsService: EventsService,
              private windowService: WindowService) {
  }

  ngOnInit(): void {
    this.filterEvents();
  }

  filterEvents(): void {
    this.filteredEvents = this.eventsService.getEvents(this.selectedEventType);
  }

  redirectToEventBooking() {
    const eventBookingUrl = `https://sunsportsinfra.com/events/booking`;
    this.windowService.openWindow(eventBookingUrl);
  }

  redirectToEventSchedule() {
    const eventScheduleUrl = `https://sunsportsinfra.com/events/schedule`;
    this.windowService.openWindow(eventScheduleUrl);
  }
}
