import { CommonModule } from '@angular/common';
import { Component,EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface FilterOption {
  id: string;
  label: string;
  icon: string;
  active: boolean;
}
export interface MonthOption {
  id: string;
  label: string;
}

@Component({
  selector: 'app-netflix-category-filter',
  imports: [FormsModule,CommonModule],
  templateUrl: './netflix-category-filter.html',
  styleUrl: './netflix-category-filter.css'
})
export class NetflixCategoryFilter {

    @Output() filterChanged = new EventEmitter<string>();
  @Output() monthChanged = new EventEmitter<string>();

  selectedFilter: string = '';
  selectedMonth: string = 'July';

filterOptions: FilterOption[] = [
    { id: 'film', label: 'Film', icon: 'fas fa-film', active: false },
    { id: 'series', label: 'Series', icon: 'fas fa-tv', active: false },
    { id: 'documentary', label: 'Documentary', icon: 'fas fa-file-video', active: false },
    { id: 'kids', label: 'Kids', icon: 'fas fa-child', active: false },
    { id: 'reality', label: 'Reality', icon: 'fas fa-video', active: false },
    { id: 'standup', label: 'Stand-Up Comedy', icon: 'fas fa-microphone', active: false },
    { id: 'game', label: 'Game', icon: 'fas fa-gamepad', active: false }
  ];

  // months: string[] = [
  //   'January', 'February', 'March', 'April', 'May', 'June',
  //   'July', 'August', 'September', 'October', 'November', 'December'
  // ];

      monthOptions: MonthOption[] = [
    { id: 'January', label: 'January' },
    { id: 'February', label: 'February' },
    { id: 'March', label: 'March' },
    { id: 'April', label: 'April' },
    { id: 'May', label: 'May' },
    { id: 'June', label: 'June' },
    { id: 'July', label: 'July' },
    { id: 'August', label: 'August' },
    { id: 'September', label: 'September' },
    { id: 'October', label: 'October' },
    { id: 'November', label: 'November' },
    { id: 'December', label: 'December' }
  ];

  ngOnInit(): void {
    // Emit default month on component init
    this.monthChanged.emit(this.selectedMonth);
  }

    onFilterSelect(filterId: string): void {
    this.selectedFilter = this.selectedFilter === filterId ? '' : filterId;
    this.filterChanged.emit(this.selectedFilter);
  }

    onMonthSelect(monthId: string): void {
    this.selectedMonth = monthId;
    this.monthChanged.emit(this.selectedMonth);
  }

    isFilterSelected(filterId: string): boolean {
    return this.selectedFilter === filterId;
  }

  isMonthSelected(monthId: string): boolean {
    return this.selectedMonth === monthId;
  }

  // onMonthChange(month: string) {
  //   this.selectedMonth = month;
  //   console.log('Selected month:', month);
  //   // Implement month change logic here
  // }

  onCategoryClick(category:FilterOption) {
    // Toggle the clicked category
    category.active = !category.active;
    console.log('Category toggled:', category.label, 'Active:', category.active);
    // Implement category filter logic here
  }

  // onCategoryClick(category: FilterCategory) {
  //   // First, deactivate all categories
  //   this.categories.forEach(cat => cat.active = false);

  //   // Then activate only the clicked category
  //   category.active = true;

  //   console.log('Category selected:', category.label);
  //   // Implement category filter logic here
  // }

  getActiveCategories(): FilterOption[] {
    return this.filterOptions.filter(fil => fil.active);
  }
}
