import {Component, OnInit} from '@angular/core';
import {BannerComponent} from '../shared/banner/banner.component';
import {RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  standalone: true,
  imports: [
    BannerComponent,
    RouterLink,
    NgIf,
    NgForOf,
  ],
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
