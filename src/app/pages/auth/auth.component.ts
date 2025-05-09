import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoading = false;
  mode: 'login' | 'register' = 'login';
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      tcNo: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      licenseNumber: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onLogin(form: any) {
    if (form.valid) {
      this.isLoading = true; // tıklayınca loading başlasın
      this.authService.login(form.value).subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);
          this.authService.saveToken(response.token);
          alert('Login successful!');
          this.isLoading = false; // başarılı olunca loading kapansın
          this.router.navigate(['']);
        },
        error: (err: any) => {
          console.error('Login error:', err);
          alert('Login failed. Please check your credentials.');
          this.isLoading = false; // Hata olursa da loading kapansın
        }
      });
    }
  }

  onRegister(form: any) {
    if (form.valid) {
      this.isLoading = true; // Tıklayınca loading başlasın

      this.authService.register(form.value).subscribe({
        next: (response: any) => {
          console.log('Register successful:', response);
          alert('Registration successful! Now you can log in.');
          this.isLoading = false; // Başarılı olunca loading kapansın
          this.mode = 'login';
        },
        error: (err: any) => {
          console.error('Register error:', err);
          alert('Registration failed. Please try again.');
          this.isLoading = false; // Hata olursa loading kapansın
        }
      });
    }
  }


  toggleMode() {
    this.mode = this.mode === 'login' ? 'register' : 'login';
  }

}
