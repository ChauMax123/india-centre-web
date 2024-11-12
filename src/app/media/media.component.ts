import {Component} from '@angular/core';
import {NgForOf, NgIf, ViewportScroller} from '@angular/common';
import {BannerComponent} from '../banner/banner.component';

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
  constructor(
    private viewportScroller: ViewportScroller) {
  }

  isLightboxOpen = false;
  currentImage: string = '';
  currentImageAlt: string = '';
  currentImageIndex: number = 0;
  selectedYearEvents: any[] = [];
  selectedCategoryEvent: any = null;

  events = [
    {
      year: 2024,
      categories: [
        {
          name: 'Diwali Celebration',
          images: [
            'assets/images/gallery/2024/DiwaliCelebration/IMG_1061.JPG',
            'assets/images/gallery/2024/DiwaliCelebration/IMG_1091.JPG',
            'assets/images/gallery/2024/DiwaliCelebration/IMG_1110.JPG',
            'assets/images/gallery/2024/DiwaliCelebration/IMG_1188.JPG',
            'assets/images/gallery/2024/DiwaliCelebration/IMG_1304.JPG',
            'assets/images/gallery/2024/DiwaliCelebration/IMG_1354.JPG',
            'assets/images/gallery/2024/DiwaliCelebration/IMG_1394.JPG',
            'assets/images/gallery/2024/DiwaliCelebration/IMG_1396.JPG',
          ]
        },
        {
          name: 'Holi Celebration',
          images: [
            'assets/images/gallery/2024/HoliCelebration/IMG_1422.JPG',
            'assets/images/gallery/2024/HoliCelebration/IMG_1464.JPG',
            'assets/images/gallery/2024/HoliCelebration/IMG_1503.JPG',
            'assets/images/gallery/2024/HoliCelebration/IMG_1540.JPG',
            'assets/images/gallery/2024/HoliCelebration/IMG_1572.JPG',
          ]
        },
        {
          name: 'Independence Day',
          images: [
            'assets/images/gallery/2024/IndependenceDay/IMG_1008.JPG',
            'assets/images/gallery/2024/IndependenceDay/IMG_1091.JPG',
            'assets/images/gallery/2024/IndependenceDay/IMG_1110.JPG',
            'assets/images/gallery/2024/IndependenceDay/IMG_1133.JPG',
            'assets/images/gallery/2024/IndependenceDay/IMG_1188.JPG',
            'assets/images/gallery/2024/IndependenceDay/IMG_1304.JPG',
            'assets/images/gallery/2024/IndependenceDay/IMG_1354.JPG',
            'assets/images/gallery/2024/IndependenceDay/IMG_1386.JPG',
            'assets/images/gallery/2024/IndependenceDay/IMG_1394.JPG',
            'assets/images/gallery/2024/IndependenceDay/IMG_1422.JPG',
            'assets/images/gallery/2024/IndependenceDay/IMG_1464.JPG',

          ]
        }
      ]
    },
    {
      year: 2023,
      categories: [
        {
          name: 'Christmas Celebration',
          images: [
            'assets/images/gallery/2023/ChristmasCelebration/IMG_1061.JPG',
            'assets/images/gallery/2023/ChristmasCelebration/IMG_1091.JPG',
            'assets/images/gallery/2023/ChristmasCelebration/IMG_1110.JPG',
            'assets/images/gallery/2023/ChristmasCelebration/IMG_1188.JPG',
            'assets/images/gallery/2023/ChristmasCelebration/IMG_1304.JPG',
            'assets/images/gallery/2023/ChristmasCelebration/IMG_1354.JPG',
            'assets/images/gallery/2023/ChristmasCelebration/IMG_1394.JPG',
            'assets/images/gallery/2023/ChristmasCelebration/IMG_1396.JPG',
          ]
        },
        {
          name: 'Summer Party',
          images: [
            'assets/images/gallery/2023/SummerParty/IMG_1422.JPG',
            'assets/images/gallery/2023/SummerParty/IMG_1464.JPG',
            'assets/images/gallery/2023/SummerParty/IMG_1503.JPG',
            'assets/images/gallery/2023/SummerParty/IMG_1540.JPG',
            'assets/images/gallery/2023/SummerParty/IMG_1572.JPG',

          ]
        }
      ]
    }
  ];

  ngOnInit(): void {
    // Default to showing events from the latest year (2024)
    const latestYear = Math.max(...this.events.map(event => event.year));
    const latestYearEvents = this.events.find(event => event.year === latestYear);
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
