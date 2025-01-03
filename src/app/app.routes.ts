import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {EventsComponent} from './events/events.component';
import {FacilitiesComponent} from './facilities/facilities.component';
import {MediaComponent} from './media/media.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {MembershipComponent} from './membership/membership.component';
import {SignupComponent} from './signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'facilities', component: FacilitiesComponent },
  { path: 'media', component: MediaComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'membership', component: MembershipComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
