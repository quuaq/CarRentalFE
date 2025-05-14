import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service'; // Yol seninkine göre ayarlanmalı
import { ReservationService, ReservationDTO } from '../../services/reservation.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  reservationId!: number;

  cardHolder: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private reservationService: ReservationService
  ) { }

  amount!: number;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.reservationId = +params['reservationId'];

      this.reservationService.getReservation(this.reservationId).subscribe({
        next: (reservation) => {
          this.amount = reservation.totalPrice;
        },
        error: (err) => {
          console.error("Rezervasyon Alınamadı!");
          alert("Reservation data has not been taked!");
        }
      })
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.reservationId) {
      const payment = {
        reservation_ID: this.reservationId,
        paymentDate: new Date(Date.now() + 5 * 60 * 1000), // Şu anki zamana +5 dakika
        amount: this.amount,
        paymentMethod: 'Kredi Kartı',
        paymentStatus: 'Paid'
      };

      this.paymentService.createPayment(payment).subscribe({
        next: () => {
          alert('Ödeme başarıyla gerçekleşti!');
          this.router.navigate(['/my-reservations']);
        },
        error: (err) => {
          console.error('Ödeme sırasında hata:', err);
          alert('Ödeme başarısız oldu!');
        }
      });
    } else {
      alert("Lütfen tüm alanları doldurunuz!");
    }
  }

  cardType: string = '';

  onCardNumberChange(event: any) {
    const number = event.target.value;
    if (number.startsWith('4')) {
      this.cardType = 'visa';
    } else if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) {
      this.cardType = 'mastercard';
    } else {
      this.cardType = '';
    }
  }
}
