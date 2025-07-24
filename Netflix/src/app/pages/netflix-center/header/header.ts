// import { Component,OnInit,HostListener } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   imports: [],
//   templateUrl: './header.html',
//   styleUrl: './header.css'
// })
// export class Header implements OnInit {
//   currentLanguage = 'English';
//   currentRegion = 'eg Egypt';
//   isScrolled = false;

//   languages = [
//     { name: 'English', code: 'en' },
//     { name: 'العربية', code: 'ar' },
//     { name: 'Español', code: 'es' },
//     { name: 'Français', code: 'fr' },
//     { name: 'Deutsch', code: 'de' },
//     { name: '中文', code: 'zh' }
//   ];

//   regions = [
//     '🇪🇬 Egypt',
//     '🇺🇸 United States',
//     '🇬🇧 United Kingdom',
//     '🇨🇦 Canada',
//     '🇦🇺 Australia',
//     '🇩🇪 Germany',
//     '🇫🇷 France',
//     '🇯🇵 Japan'
//   ];

//   constructor() { }

//   ngOnInit(): void { }

//   @HostListener('window:scroll', ['$event'])
//   onWindowScroll() {
//     this.isScrolled = window.pageYOffset > 100;
//   }

//   changeLanguage(language: any): void {
//     this.currentLanguage = language.name;
//     // Emit language change event or call service
//     console.log('Language changed to:', language);
//   }

//   changeRegion(region: string): void {
//     this.currentRegion = region;
//     console.log('Region changed to:', region);
//   }

//   onSearch(): void {
//     console.log('Search clicked');
//   }

//   onApply(): void {
//     console.log('Apply clicked');
//   }

//   onPressLogin(): void {
//     console.log('Press login clicked');
//   }
// }
