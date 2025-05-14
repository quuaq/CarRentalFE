import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-logs.component.html',
  styleUrls: ['./admin-logs.component.css']
})
export class AdminLogsComponent implements OnInit {
  logs: any[] = [];
  currentPage: number = 1;
  pageSize: number = 30;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:44321/api/Logs').subscribe(data => {
      // En güncel loglar en üstte gözüksün
      this.logs = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    });
  }

  get paginatedLogs() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.logs.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.logs.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
  return Math.ceil(this.logs.length / this.pageSize);
}
}
