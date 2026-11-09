import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, MenubarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  menuOpen = false;

  items: MenuItem[] = [
    { label: 'الرئيسية', url: '#home' },
    { label: 'الخدمات', url: '#services' },
    { label: 'الأطباء', url: '#doctors' },
    { label: 'عن العيادة', url: '#about' },
    { label: 'المدونة', url: '#blog' },
    { label: 'تواصل معنا', url: '#contact' },
  ];

  goToBooking(): void {
    document.getElementById('booking')?.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
