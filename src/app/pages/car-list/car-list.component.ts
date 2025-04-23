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
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const start = params['start'];
      const end = params['end'];

      if (start && end) {
        this.carService.getAvailableCars(start, end).subscribe(data => {
          this.cars = data;
          console.log(this.cars); // test amaçlı
        });
      }
    });
  }
}
