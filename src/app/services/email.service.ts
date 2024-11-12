import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly serviceId = 'service_l0e6o8g'; // EmailJS service ID
  private readonly templateId = 'template_z0lmtwn'; // EmailJS template ID
  private readonly publicKey = '55NgMmQ0Qt7xPjFKV'; //EmailJS public key

  constructor() {
    emailjs.init(this.publicKey);
  }

  async sendEmail(emailParams: {
    from_name: string;
    phone: string;
    from_email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    try {
      const response = await emailjs.send(this.serviceId, this.templateId, emailParams);
      console.log('Email sent successfully!', response.status, response.text);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('There was an error sending your message. Please try again.');
    }
  }
}
