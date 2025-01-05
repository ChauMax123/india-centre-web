import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private inquiryEndpoint = `${environment.backendUrl}/api/inquiry`;

  constructor(private http: HttpClient) {}

  sendInquiry(inquiryData: any): Observable<any> {
    return this.http.post(this.inquiryEndpoint, inquiryData, { responseType: 'text' });
  }
}
