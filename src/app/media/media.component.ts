import {Component} from '@angular/core';
import {NgForOf, NgIf, ViewportScroller} from '@angular/common';
import {BannerComponent} from '../shared/banner/banner.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [
    NgForOf,
    BannerComponent,
    NgIf
  ],
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent {
  events: any[] = [];
  selectedYearEvents: any[] = [];
  selectedCategoryEvent: any = null;
  isLightboxOpen = false;
  currentImage: string = '';
  currentImageAlt: string = '';
  currentImageIndex: number = 0;


  constructor(
    private http: HttpClient,
    private viewportScroller: ViewportScroller) {
  }

  ngOnInit(): void {
    this.http.get<any[]>('assets/data/gallery-data.json').subscribe((data) => {
      this.events = data;
      this.selectLatestYearEvents();
    });
  }

  selectLatestYearEvents(): void {
    const latestYear = Math.max(...this.events.map((event) => event.year));
    const latestYearEvents = this.events.find((event) => event.year === latestYear);
    this.selectedYearEvents = latestYearEvents ? latestYearEvents.categories : [];
  }


  filterByYear(event: any) {
    const selectedYear = event.target.value;

    if (selectedYear === 'all') {
      this.selectedYearEvents = this.events.flatMap(event => event.categories);
    } else {
      const filteredEvents = this.events.find(event => event.year.toString() === selectedYear);
      this.selectedYearEvents = filteredEvents ? filteredEvents.categories : [];
    }
  }

  openEventGallery(category: any): void {
    this.selectedCategoryEvent = category;
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  closeEventGallery(): void {
    this.selectedCategoryEvent = null;
  }

  openLightbox(index: number, category: any): void {
    this.currentImageIndex = index;
    this.currentImage = category.images[index];
    this.currentImageAlt = category.name + ' Image';
    this.selectedCategoryEvent = category;
    this.isLightboxOpen = true;
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
  }

  nextImage(): void {
    if (this.selectedCategoryEvent && this.currentImageIndex < this.selectedCategoryEvent.images.length - 1) {
      this.currentImageIndex++;
      this.currentImage = this.selectedCategoryEvent.images[this.currentImageIndex];
    } else if (this.currentImageIndex == this.selectedCategoryEvent.images.length - 1) {
      this.currentImageIndex = 0;
      this.currentImage = this.selectedCategoryEvent.images[this.currentImageIndex];
    }
  }

  previousImage(): void {

    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.currentImage = this.selectedCategoryEvent.images[this.currentImageIndex];
    } else if (this.currentImageIndex == 0) {
      this.currentImageIndex = this.selectedCategoryEvent.images.length - 1;
      this.currentImage = this.selectedCategoryEvent.images[this.currentImageIndex];
    }
  }

}
