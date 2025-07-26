import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  imports: [CommonModule],
  templateUrl: './toggle-switch.html',
  styleUrl: './toggle-switch.css'
})
export class ToggleSwitch {
 @Input() label!: string;
  @Input() description?: string;
  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  onToggle(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checkedChange.emit(target.checked);
  }
}
