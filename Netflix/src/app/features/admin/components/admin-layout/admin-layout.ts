import { Component, OnInit } from '@angular/core';
import { NavBar } from '../../shared/nav-bar/nav-bar';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminService } from '../../../../admin/services/admin.service';
import { DashboardServices } from '../../services/admin-dashboard/dashboard-services';

@Component({
  selector: 'app-admin-layout',
  imports: [NavBar,RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {}


