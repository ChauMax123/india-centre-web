import {AfterViewInit, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {EventsService} from '../services/events/events.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {isPlatformBrowser, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {BannerComponent} from '../shared/banner/banner.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {EmailService} from '../services/email.service';


declare var grecaptcha: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    NgForOf,
    RouterLink,
    BannerComponent,
    CarouselModule,
    NgOptimizedImage,
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  events: any[] = [];
  selectedEventType: string = 'Upcoming';
  emailSent: boolean = false;
  errorMessage: string = '';
  form: FormGroup;


  constructor(
    private eventsService: EventsService,
    private fb: FormBuilder,
    private router: Router,
    private emailService: EmailService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.form = this.fb.group({
      from_name: ['', Validators.required],
      phone: ['', Validators.required],
      from_email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  goToAboutUs() {
    this.router.navigate(['/about-us']).then(() => {
    });
  }

  ngOnInit(): void {
    this.filterEvents();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof grecaptcha !== 'undefined') {

        const recaptchaContainer = document.getElementById('home-recaptcha');
        if (!recaptchaContainer || recaptchaContainer.hasChildNodes()) {
          return;
        }
      } else {
        console.error('grecaptcha is not defined.');
      }
    }
  }

  filterEvents(): void {
    this.events = this.eventsService.getEvents(this.selectedEventType);
  }

  async sendEmail() {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.emailService.sendInquiry(this.form.value)
      .subscribe({
        next: () => {
          alert('Email sent successfully!');
          this.emailSent = true;
          this.errorMessage = '';
          this.form.reset();
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'There was an error sending your message. Please try again later.';
          this.emailSent = false;
        },
      });
  }
}
