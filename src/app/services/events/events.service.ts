import { Injectable } from '@angular/core';

interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private upcomingEvents: Event[] = [
    { title: 'Diwali Celebration', date: 'November 12, 2023', location: 'India Centre', description: 'Celebrate the festival of lights with us!' },
    { title: 'Christmas Gathering', date: 'December 25, 2023', location: 'Community Center', description: 'Join us for Christmas festivities!' },
    { title: 'Diwali Celebration', date: 'November 12, 2023', location: 'India Centre', description: 'Celebrate the festival of lights with us!' },
    { title: 'Christmas Gathering', date: 'December 25, 2023', location: 'Community Center', description: 'Join us for Christmas festivities!' },
    { title: 'Diwali Celebration', date: 'November 12, 2023', location: 'India Centre', description: 'Celebrate the festival of lights with us!' },
    { title: 'Christmas Gathering', date: 'December 25, 2023', location: 'Community Center', description: 'Join us for Christmas festivities!' }


  ];

  private currentEvents: Event[] = [
    { title: 'Yoga Workshop', date: 'October 15, 2023', location: 'Yoga Hall', description: 'Rejuvenate with our yoga session.' },
    { title: 'Cooking Class', date: 'October 20, 2023', location: 'Kitchen Area', description: 'Learn traditional cooking techniques.' }
  ];

  private pastEvents: Event[] = [
    { title: 'Holi Festival', date: 'March 8, 2023', location: 'Main Grounds', description: 'Experience the colors of Holi with live music.' },
    { title: 'Independence Day Event', date: 'August 15, 2023', location: 'City Square', description: 'Commemorating India’s Independence Day.' },
    { title: 'Diwali Celebration', date: 'November 12, 2023', location: 'India Centre', description: 'Celebrate the festival of lights with us!' },
    { title: 'Christmas Gathering', date: 'December 25, 2023', location: 'Community Center', description: 'Join us for Christmas festivities!' }
  ];

  getEvents(eventType: string): Event[] {
    switch (eventType) {
      case 'Upcoming':
        return this.upcomingEvents;
      case 'Current':
        return this.currentEvents;
      case 'Past':
        return this.pastEvents;
      default:
        return [];
    }
  }
}
