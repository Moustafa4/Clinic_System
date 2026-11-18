import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Data } from '../../core/Services/data';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-panel',
  imports: [SvgIconComponent, RouterLink],
  templateUrl: './panel.html',
  styleUrl: './panel.scss',
})
export class Panel implements OnInit {
  private dataService = inject(Data);
  private router = inject(Router);

  roles = signal<string[]>([]);
  selectedRole = signal<string | null>(null);

  ngOnInit(): void {
    this.getRole();
  }

  getRole(): void {
    this.dataService.Get<string[]>('Genral/Roles').subscribe({
      next: (res: string[]) => {
        this.roles.set(res);
      },
      error: (err) => {
        console.error('Error loading roles:', err);
      },
    });
  }

  selectRole(role: string): void {
    this.selectedRole.set(role);
  }

  login(): void {
    const role = this.selectedRole();

    if (!role) return;

    this.router.navigate(['/login'], {
      queryParams: {
        role: role,
      },
    });
  }
  register(): void {
    const role = this.selectedRole();

    if (!role) return;

    this.router.navigate(['/register'], {
      queryParams: {
        role: role,
      },
    });
  }
}
