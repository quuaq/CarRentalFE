import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService, ReservationDTO } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-history.component.html',
  styleUrls: ['./reservation-history.component.css']
})
export class ReservationHistoryComponent implements OnInit {
  reservations: ReservationDTO[] = [];

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.reservationService.getReservationsByUser(userId).subscribe({
        next: (data) => this.reservations = data,
        error: (err) => {
          console.error("Rezervasyonlar alınamadı", err);
          alert("Rezervasyonlar yüklenirken bir hata oluştu.");
        }
      });
    }
  }

  goToPayment(reservationId: number): void {
    this.router.navigate(['/payment'], { queryParams: { reservationId } });
  }

  cancelReservation(reservationId: number | undefined): void {
    if (!reservationId) {
      alert("Geçersiz rezervasyon ID");
      return;
    }

    if (confirm('Bu rezervasyonu iptal etmek istiyor musunuz?')) {
      this.reservationService.deleteReservation(reservationId).subscribe({
        next: () => {
          alert('Rezervasyon iptal edildi.');
          this.reservations = this.reservations.filter(r => r.reservation_ID !== reservationId);
        },
        error: () => alert('İptal sırasında hata oluştu.')
      });
    }
  }

}
