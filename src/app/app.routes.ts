import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CarsComponent } from './pages/cars/cars.component';
import { CarListComponent } from './pages/car-list/car-list.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ReservationHistoryComponent } from './pages/reservation-history/reservation-history.component';
import { AdminReservationsComponent } from './pages/admin-reservations/admin-reservations.component';


export const routes: Routes = [
  {path: '', component: HomeComponent}, //Ana sayfa olarak Home 
  {path: 'about', component: AboutComponent},
  {path: 'cars', component: CarsComponent},
  {path: 'car-list', component: CarListComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'my-reservations', component:ReservationHistoryComponent},
  {path: 'admin-reservations', component:AdminReservationsComponent},
  {path: 'payment',
   loadComponent: () => import('./pages/payment/payment.component').then(m => m.PaymentComponent) // lazy yükleme yaptın. bu işlem performansı arttırır, başlangıç paketini küçültür. 
  }
];
