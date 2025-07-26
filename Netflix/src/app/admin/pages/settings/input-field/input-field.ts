import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [CommonModule,FormsModule],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css'
})
export class InputField {
 @Input() label!: string;
  @Input() value: any = '';
  @Input() type: string = 'text';
  @Input() options?: { value: any; label: string }[] = undefined;
  @Output() valueChange = new EventEmitter<any>();

  onValueChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    this.valueChange.emit(target.value);
  }
}
