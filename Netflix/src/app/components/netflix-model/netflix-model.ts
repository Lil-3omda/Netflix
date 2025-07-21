import { CommonModule } from '@angular/common';
import { Component , Input, Output, EventEmitter  } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-netflix-model',
  imports: [FormsModule,CommonModule],
  templateUrl: './netflix-model.html',
  styleUrl: './netflix-model.css'
})
export class NetflixModel {
 @Input() isVisible: boolean = true;
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }

  onPlay() {
    console.log('Play clicked');
  }

  onAddToList() {
    console.log('Add to list clicked');
  }

  onDownload() {
    console.log('Download clicked');
  }

  onVolumeToggle() {
    console.log('Volume toggle clicked');
  }
}
