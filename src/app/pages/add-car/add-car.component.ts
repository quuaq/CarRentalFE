import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
  newCar = {
    make: '',
    model: '',
    year: new Date().getFullYear(),
    pricePerDay: 0,
    licensePlate: '',
    isAvailable: true
  };

  constructor(private http: HttpClient) { }

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addCar() {
    this.http.post('https://localhost:44321/api/Cars', this.newCar).subscribe({
      next: (car: any) => {
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('file', this.selectedFile);
          this.http.post(`https://localhost:44321/api/Cars/upload-image/${car.car_ID}`, formData).subscribe({
            next: () => alert('Car and image added successfully!'),
            error: () => alert('Car added but failed to upload image.')
          });
        } else {
          alert('Car added successfully without image!');
        }
      },
      error: () => alert('Failed to add car.')
    });
  }

  deletePlate: string = '';

  confirmDelete() {
    console.log("Silinecek Plaka:", this.deletePlate);
    if (!this.deletePlate) {
      alert("Please enter the license plate!");
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `Car with plate ${this.deletePlate} will be permanently deleted!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCarByPlate();
      }
    });
  }

  deleteCarByPlate() {
    this.http.delete(`https://localhost:44321/api/Cars/by-plate/${this.deletePlate}`).subscribe({
      next: () => {
        Swal.fire('Deleted!', 'Car has been deleted.', 'success');
        this.deletePlate = '';
      },
      error: (err) => {
        if (err.status === 400) {
          Swal.fire('Reservation Active!', 'This car is currently under active reservation or payment is completed.', 'warning');
        } else if (err.status === 404) {
          Swal.fire('Not Found!', 'Car with this license plate does not exist.', 'info');
        } else {
          Swal.fire('Error!', 'Car could not be deleted.', 'error');
        }
      }
    });

  }





}
