import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: any[] = [];
  startDate?: Date;
  endDate?: Date;
  dayCount: number = 0;
  showPrices: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private reservationService: ReservationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const start = params['start'];
      const end = params['end'];

      if (start && end) {
        this.showPrices = true;
        this.startDate = new Date(start);
        this.endDate = new Date(end);
        this.dayCount = Math.ceil(
          (this.endDate.getTime() - this.startDate.getTime()) / (1000 * 3600 * 24)
        );

        // Tarih seçildiyse sadece uygun araçlar gelsin
        this.carService.getAvailableCars(start, end).subscribe(data => {
          this.cars = data.map(car => ({
            ...car,
            totalPrice: car.pricePerDay * this.dayCount
          }));
        });

      } else {
        // Tarih seçilmemişse sadece boşta olan araçlar gelsin
        this.carService.getAllCars().subscribe((data: any[]) => {
          this.cars = data;
        });
      }
    });
  }


  onReserve(carId: number, pricePerDay: number) {
    if (!this.startDate || !this.endDate) {
      Swal.fire({
        icon: 'info',
        title: 'Date Selection Required',
        text: 'Please select the date for booking the car',
        confirmButtonText: 'Select Date',
      }).then(() => {
        this.router.navigate(['/']);
      });
      return;
    }

    if (!this.authService.getToken()) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to make a reservation.',
        confirmButtonText: 'Login',
      }).then(() => {
        this.router.navigate(['/auth']);
      })
      return;
    }

    const userId = this.authService.getUserIdFromToken();
    if (userId === null) {
      alert("Kullanıcı kimliği alınamadı. Lütfen tekrar giriş yapın.");
      return;
    }

    const reservation = {
      user_ID: userId,
      car_ID: carId,
      startDate: this.startDate.toISOString(),
      endDate: this.endDate.toISOString(),
      totalPrice: pricePerDay * this.dayCount,
      status: 'Pending'
    };

    this.reservationService.createReservation(reservation).subscribe({
      next: () => alert("Rezervasyon başarıyla oluşturuldu!"),
      error: err => {
        console.error("Rezervasyon hatası:", err);
        alert("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    });
  }

}
