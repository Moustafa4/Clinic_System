import { Component, EventEmitter, inject, Output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/Services/auth-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Output() sidebarToggle = new EventEmitter<void>();

  private Auth = inject(AuthService);

  adminName = computed(() => this.Auth.userData()?.name ?? 'المستخدم');

  adminRole = computed(() => this.Auth.role() ?? 'مدير النظام');

  profileImage = '';

  profileOpen = false;

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  logout(): void {
    this.Auth.logout();
  }
}
