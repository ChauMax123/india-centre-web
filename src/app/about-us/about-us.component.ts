import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BannerComponent} from "../shared/banner/banner.component";
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [FormsModule, BannerComponent, NgOptimizedImage],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
}
