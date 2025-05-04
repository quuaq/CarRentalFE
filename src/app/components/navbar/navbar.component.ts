import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        this.checkIfAdmin();
      } else {
        this.isAdmin = false;
      }
    });
  }

  checkIfAdmin(): void {
    const token = this.authService.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      const role = decoded?.role;
      this.isAdmin = role?.toLowerCase() === 'admin';
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
