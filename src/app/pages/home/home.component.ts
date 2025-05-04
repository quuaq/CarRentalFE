import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
declare var bootstrap: any;


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    const carouselElement = document.querySelector('#carCarousel');
    if (carouselElement) {
      // @ts-ignore // TypeScript bu satırı görmezden gelsin
      new bootstrap.Carousel(carouselElement, {
        interval: 3000, // 3 saniyede bir geçsin
        ride: 'carousel'
      });
    }
  }

  onSubmit(form: any) {
    const startDate = form.value.startDate;
    const startTime = form.value.startTime;
    const endDate = form.value.endDate;
    const endTime = form.value.endTime;

    // Tarih ve saatleri ISO formatına çeviriyoruz
    const pickupDateTime = `${startDate}T${startTime}`;
    const returnDateTime = `${endDate}T${endTime}`;

    this.router.navigate(['/car-list'], {
      queryParams: {
        start: pickupDateTime,
        end: returnDateTime
      }
    });
  }
}
