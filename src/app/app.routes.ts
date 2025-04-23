import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CarsComponent } from './pages/cars/cars.component';
import { CarListComponent } from './pages/car-list/car-list.component';

export const routes: Routes = [
  {path: '', component: HomeComponent}, //Ana sayfa olarak Home 
  {path: 'about', component: AboutComponent},
  {path: 'cars', component: CarsComponent},
  {path: 'car-list', component: CarListComponent  }
];
