import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-term-footer',
  imports: [CommonModule,FormsModule],
  templateUrl: './term-footer.html',
  styleUrl: './term-footer.css'
})
export class TermFooter {
 constructor() { }
}
