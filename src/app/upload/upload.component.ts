import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { PocketBaseService } from '../pocketbase.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  selectedFile: File | null = null

  constructor(
    private pb: PocketBaseService,
  ) { }

  onFileSelected(event: Event): void {
    console.log('File selected', event);
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file', this.selectedFile);
    }
  }

  async onUpload() {
    console.log('Upload', this.selectedFile);
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);
      await this.pb.create('product', formData)
      console.log('Upload done');

    } else {
      console.error('Keine Datei ausgewählt');
    }
  }

}
