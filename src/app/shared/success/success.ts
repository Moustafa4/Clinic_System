import { Component, DestroyRef, inject, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Core } from '../../core/Services/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './success.html',
  styleUrl: './success.scss',
})
export class Success {
  private core = inject(Core);
  private destroyRef = inject(DestroyRef);

  message = this.core._Sussess;

  isVisible = signal<boolean>(false);

  constructor() {
    // this.core._Sussess.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((message: string) => {
    //   this.message.set(message);
    //   this.isVisible.set(!!message);
    // });
  }

  closeModal(): void {
    this.isVisible.set(false);

    this.core._Sussess.next('');
  }
}
