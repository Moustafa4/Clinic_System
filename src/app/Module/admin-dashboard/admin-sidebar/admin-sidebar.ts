import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';

import { Router, RouterModule } from '@angular/router';

import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

import { PIcon } from '@primeicons/angular/p-icon';

import { AuthService } from '../../../core/Services/auth-service';

interface NavItem {
  icon: string;
  label: string;
  route?: string;
  action?: 'logout';
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterModule, AvatarModule, SidebarModule, ButtonModule, PIcon],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.scss',
})
export class AdminSidebar implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isMobile = signal(false);
  open = signal(true);

  private mql?: MediaQueryList;
  private mqlListener?: (e: MediaQueryListEvent) => void;
  private readonly mobileBreakpoint = '(max-width: 1023px)';

  navGroups: NavGroup[] = [
    {
      label: '',
      items: [
        {
          icon: 'home',
          label: 'لوحة التحكم',
          route: '/admin-dashboard/overview',
        },
        {
          icon: 'user',
          label: 'الأطباء',
          route: '/admin-dashboard/doctor',
        },
        {
          icon: 'building',
          label: 'العيادات',
          route: '/admin-dashboard/clinic',
        },
        {
          icon: 'users',
          label: 'المرضى',
          route: '/admin-dashboard/patient',
        },
        {
          icon: 'calendar',
          label: 'المواعيد',
          route: '/admin-dashboard/dates',
        },
        {
          icon: 'comments',
          label: 'الاستشارات',
          route: '/admin-dashboard/consultants',
        },
        {
          icon: 'chart-bar',
          label: 'التقارير',
          route: '/admin-dashboard/report',
        },
        {
          icon: 'cog',
          label: 'الإعدادات',
          route: '/admin-dashboard/settings',
        },
      ],
    },
    {
      label: 'الحساب',
      items: [
        {
          icon: 'sign-out',
          label: 'تسجيل الخروج',
          action: 'logout',
        },
      ],
    },
  ];

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    this.mql = window.matchMedia(this.mobileBreakpoint);

    this.isMobile.set(this.mql.matches);
    this.open.set(!this.mql.matches);

    this.mqlListener = (e: MediaQueryListEvent) => {
      this.isMobile.set(e.matches);
      this.open.set(!e.matches);
    };

    this.mql.addEventListener('change', this.mqlListener);
  }

  onNavClick(item: NavItem): void {
    if (item.action === 'logout') {
      this.logout();
      return;
    }

    if (this.isMobile()) {
      this.open.set(false);
    }
  }
  toggleSidebar(): void {
    this.open.update((value) => !value);
  }

  closeSidebar(): void {
    if (this.isMobile()) {
      this.open.set(false);
    }
  }
  logout(): void {
    this.authService.logout();

    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    if (this.mql && this.mqlListener) {
      this.mql.removeEventListener('change', this.mqlListener);
    }
  }
}
