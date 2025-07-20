import { Routes } from '@angular/router';
import { Category } from './shared/category/category';

export const routes: Routes = [
    {path:'category/:categoryName',component:Category}
];
