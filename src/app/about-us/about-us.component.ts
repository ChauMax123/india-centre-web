import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BannerComponent} from "../banner/banner.component";

@Component({
  selector: 'app-about-us',
  standalone: true,
    imports: [FormsModule, BannerComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
}
