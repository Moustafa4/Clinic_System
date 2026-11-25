import { Component } from '@angular/core';
import { AdminSidebar } from './admin-sidebar/admin-sidebar';
import { Header } from '../../shared/header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [AdminSidebar, Header, RouterOutlet],
  selector: 'app-admin-dashboard',
  styleUrl: './admin-dashboard.scss',
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard {}
