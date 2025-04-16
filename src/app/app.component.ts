import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//TEst
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CarRentalFrontEnd';
}
