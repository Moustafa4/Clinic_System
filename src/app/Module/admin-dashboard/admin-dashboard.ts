import { Component } from '@angular/core';
import { AdminSidebar } from './admin-sidebar/admin-sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [AdminSidebar, RouterOutlet],
  selector: 'app-admin-dashboard',
  styleUrl: './admin-dashboard.scss',
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard {}

@Component({
  template: '<h1>لوحة التحكم</h1>',
})
export class AdminOverview {}
