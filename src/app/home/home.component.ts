import {Component, OnInit} from '@angular/core';
import {EventsService} from '../services/events.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {EmailService} from '../services/email.service';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {BannerComponent} from '../banner/banner.component';
import {CarouselModule} from 'ngx-owl-carousel-o';

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
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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

  filterEvents(): void {
    this.events = this.eventsService.getEvents(this.selectedEventType);
  }

  async sendEmail() {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    try {
      await this.emailService.sendEmail(this.form.value);
      this.emailSent = true;
      this.errorMessage = '';
      this.form.reset();
    } catch (error: any) {
      this.errorMessage = error.message;
      this.emailSent = false;
    }
  }
}
