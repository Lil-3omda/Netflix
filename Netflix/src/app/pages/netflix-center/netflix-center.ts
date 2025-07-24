import { Component } from '@angular/core';
import { NetflixCategoryFilter } from '../../shared/netflix-category-filter/netflix-category-filter';
import { ContentGrid } from '../../components/content-grid/content-grid';
import { NewsSection } from '../../components/news-section/news-section';
import { NetflixCenterBanar } from '../../components/netflix-center-banar/netflix-center-banar';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-netflix-center',
  imports: [NetflixCategoryFilter,ContentGrid,NewsSection,NetflixCenterBanar,Footer],
  templateUrl: './netflix-center.html',
  styleUrl: './netflix-center.css'
})

export class NetflixCenter {
  onSearch(event: any) {
    const query = event.target.value;
    console.log('Search query:', query);
    // Implement search functionality here
  }

  onApply() {
    console.log('Apply button clicked');
    // Implement apply functionality here
  }

  onPressLogIn() {
    console.log('Press Log In clicked');
    // Implement login functionality here
  }

  onNewsroom() {
    console.log('Newsroom clicked');
    // Implement newsroom navigation here
  }

  // filter
   selectedFilter: string = '';
  selectedMonth: string = '';

  onFilterChanged(filter: string): void {
    this.selectedFilter = filter;
    console.log('Filter changed to:', filter);
  }

  onMonthChanged(month: string): void {
    this.selectedMonth = month;
    console.log('Month changed to:', month);
  }

}
