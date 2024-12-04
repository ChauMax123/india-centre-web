import { Component, Input } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  @Input() isHomePage: boolean = false;
  @Input() title: string = '';
  @Input() description: string = '';
}
