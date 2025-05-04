import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-admin-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reservations.component.html',
  styleUrls: ['./admin-reservations.component.css']
})
export class AdminReservationsComponent implements OnInit {
  reservations: any[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.getAllReservations();
  }

  getAllReservations() {
    this.reservationService.getAllReservations().subscribe({
      next: data => this.reservations = data,
      error: err => console.error("Rezervasyonlar alınamadı:", err)
    });
  }
}
