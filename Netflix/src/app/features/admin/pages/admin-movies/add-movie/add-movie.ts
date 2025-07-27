import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DashboardServices } from '../../../services/admin-dashboard/dashboard-services';
import { HttpEventType } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./add-movie.css']
})
export class AddMovie {

  movieForm: FormGroup;
  categories: any[] = [];

  uploadProgress: number = 0;
  uploading: boolean = false;
  

  constructor(private fb: FormBuilder, private dashboardServices: DashboardServices, private router:Router) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      trailerUrl: ['', Validators.required],
      categoryId: ['', Validators.required],
      videoFile: [null, Validators.required],
      imageFile: [null, Validators.required]
    });

    this.loadCategories();
  }

  loadCategories(): void {
    this.dashboardServices.getCategories().subscribe({
      next: data => this.categories = data,
      error: err => console.error('Error loading categories:', err)
    });
  }

  onFileChange(event: any, controlName: string): void {
  const file = event.target.files[0];
  if (file) {
    this.movieForm.patchValue({ [controlName]: file });
  }
}



onSubmit(): void {
  if (!this.movieForm.valid) {
    console.error('Form not valid or files missing.');
    return;
  }else{
    const formData= new FormData();
    formData.append('Title', this.movieForm.get('title')?.value);
    formData.append('Description', this.movieForm.get('description')?.value);
    formData.append('TrailerUrl', this.movieForm.get('trailerUrl')?.value);
    formData.append('CategoryId', this.movieForm.get('categoryId')?.value);
    formData.append('VideoFile', this.movieForm.get('videoFile')?.value);
    formData.append('ImageFile', this.movieForm.get('imageFile')?.value);
    this.uploading = true;
    this.dashboardServices.uploadMovie(formData).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((event.loaded / event.total!) * 100);
          this.uploadProgress = percentDone;
          console.log(`File is ${percentDone}% uploaded.`);
           this.router.navigate(['/AdminTest/movies'])
        } else if (event.type === HttpEventType.Response) {
          console.log('File successfully uploaded:', event.body);
          this.movieForm.reset();
          this.uploadProgress = 0;
          this.uploading = false;

          this.router.navigate(['/AdminTest/movies'])
        }
      },
      error: err => {
        console.error('Error uploading movie:', err);
      }
    });
    
  }
}

}
