import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private carService: CarService
  ) { }

  startDate!: Date;
  endDate!: Date;
  dayCount: number = 0;


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const start = params['start'];
      const end = params['end'];

      if (start && end) {

        const startDate = new Date(start);
        const endDate = new Date(end);

        const dayCount = Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
        );


        this.carService.getAvailableCars(start, end).subscribe(data => {
          this.cars = data.map(car => ({
            ...car,
            totalPrice: car.pricePerDay * dayCount
          }));
          console.log(this.cars); // test amaçlı
        });
      }
      this.startDate = new Date(start);
      this.endDate = new Date(end);
      this.dayCount = Math.ceil((this.endDate.getTime() - this.startDate.getTime()) / (1000 * 3600 * 24));

    });

  }
}
