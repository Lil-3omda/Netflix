import { Routes } from '@angular/router';
import { Category } from './shared/category/category';
import { Home } from './features/videos/home/home';

export const routes: Routes = [
    {path: '', component: Home},
    {path:'category/:categoryName',component:Category}
];
