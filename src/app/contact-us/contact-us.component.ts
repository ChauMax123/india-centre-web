import {AfterViewInit, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {isPlatformBrowser, NgIf} from '@angular/common';
import {BannerComponent} from '../shared/banner/banner.component';
import {EmailService} from '../services/email.service';

declare var grecaptcha: any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    BannerComponent
  ],
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  emailSent: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    @Inject(PLATFORM_ID) private platformId: any) {
    this.form = this.fb.group({
      from_name: ['', Validators.required],
      phone: ['', Validators.required],
      from_email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
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

  async sendEmail() {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const inquiryData = this.form.value;

    this.emailService.sendInquiry(inquiryData)
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
