import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService, InvoiceDetailDTO } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoiceId!: number;
  invoice?: InvoiceDetailDTO;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) { }

  paymentId!: number;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      //console.log("Alınan paymentId route param:", params['paymentId']);
      this.paymentId = +params['paymentId'];
      this.loadInvoice();
    });
  }


  loadInvoice(): void {
    this.invoiceService.getInvoiceDetail(this.paymentId).subscribe({
      next: data => this.invoice = data,
      error: err => {
        console.error('Fatura getirilemedi:', err);
        alert('Fatura yüklenirken hata oluştu.');
      }
    });
  }
}
