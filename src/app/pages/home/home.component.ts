import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements AfterViewInit {

  constructor(private router: Router) { }

  carousel: any; 

  ngAfterViewInit(): void {
    // Bootstrap carousel
    const carouselElement = document.querySelector('#carCarousel');
    if (carouselElement) {
      // @ts-ignore
      this.carousel = new bootstrap.Carousel(carouselElement, {
        interval: 3000,
        ride: 'carousel'
      });
    }

    

    this.map = L.map('map').setView([35.147503, 33.502915], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  
    const customIcon = L.icon({
      iconUrl: 'assets/icons/location-pin.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });
  
    this.marker = L.marker([35.147503, 33.502915], { icon: customIcon })
      .addTo(this.map)
      .bindPopup('Ercan Airport')
      .openPopup();
  
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 100);
  }

  //Çoklu lokasyon yerleri ve map'e entegre edilmesi
  map: L.Map | undefined;
  marker: L.Marker | undefined;
  selectedLocation = 'Ercan Airport';
  locations = [
    { name: 'Ercan Airport', lat: 35.147503, lng: 33.502915 },
    { name: 'Guzelyurt Terminal', lat: 35.2010, lng: 32.9946 },
    { name: 'Kyrenia Harbour', lat: 35.3402, lng: 33.3196 },
    { name: 'Magosa Harbour', lat: 35.1257, lng: 33.9442 }
  ];

  //Çoklu lokasyon seçimi fonksiyonu
  updateMap() {
    const loc = this.locations.find(l => l.name === this.selectedLocation);
    if (loc && this.map && this.marker) {
      this.map.setView([loc.lat, loc.lng], 12);
      this.marker.setLatLng([loc.lat, loc.lng])
        .bindPopup(loc.name)
        .openPopup();
    }
  }
  

  onSubmit(form: any) {
    const startDate = form.value.startDate;
    const startTime = form.value.startTime;
    const endDate = form.value.endDate;
    const endTime = form.value.endTime;

    if (!startDate || !startTime || !endDate || !endTime) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information!',
        text: 'Please fill in all date and time fields.',
        confirmButtonText: 'OK'
      });
      return;
    }


    const pickupDateTime = `${startDate}T${startTime}`;
    const returnDateTime = `${endDate}T${endTime}`;

    this.router.navigate(['/car-list'], {
      queryParams: {
        start: pickupDateTime,
        end: returnDateTime
      }
    });
  }

  flippedCard: string | null = null;
  showDetails(cardId: string) {
    this.flippedCard = cardId;
    if (this.carousel) {
      this.carousel.pause(); // carousel durdur
    }
  }
  
  hideDetails() {
    this.flippedCard = null;
    if (this.carousel) {
      this.carousel.cycle(); 
    }
  }

  scrollToReservation() {
    const form = document.querySelector('form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
}
