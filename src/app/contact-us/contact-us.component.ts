import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../services/email.service';
import { NgIf } from '@angular/common';
import {BannerComponent} from '../banner/banner.component';

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
export class ContactUsComponent implements OnInit {
  form: FormGroup;
  emailSent: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.form = this.fb.group({
      from_name: ['', Validators.required],
      phone: ['', Validators.required],
      from_email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

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
      this.errorMessage = error?.message || 'There was an error sending your message. Please try again.';
      this.emailSent = false;
    }
  }
}
