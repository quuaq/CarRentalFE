import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


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
    if (form.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Information!',
        text: 'Please fill in all fields and enter valid information.',
        confirmButtonText: 'OK'
      });
      return;
    }

    this.isLoading = true;
    this.authService.login(form.value).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        this.authService.saveToken(response.token);
        Swal.fire({
          icon: 'success',
          title: 'Login Success!',
          text: 'You are routing home page...',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.isLoading = false;
          this.router.navigate(['']);
        });
      },
      error: (err: any) => {
        console.error('Login error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: 'The email or password is incorrect. Please try again.',
          confirmButtonText: 'OK'
        });
        this.isLoading = false;
      }
    });
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
