import {Component} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {AboutUsComponent} from './about-us/about-us.component';
import {HomeComponent} from './home/home.component';
import {EventsComponent} from './events/events.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {MediaComponent} from './media/media.component';
import {FacilitiesComponent} from './facilities/facilities.component';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {CommonModule} from '@angular/common';
import {MembershipComponent} from './membership/membership.component';
import {WindowService} from './services/window/window.service';
import {SignupComponent} from './signup/signup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AboutUsComponent,
    HomeComponent,
    EventsComponent,
    ContactUsComponent,
    MediaComponent,
    FacilitiesComponent,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    MembershipComponent,
    SignupComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'India-Centre-Fd';

  constructor(private router: Router, private windowService: WindowService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.windowService.scrollToTop();
      }
    });
  }
}
