import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Loading {
  private requestCount = signal(0);

  isloading = computed(() => this.requestCount() > 0);

  show() {
    this.requestCount.update((count) => count + 1);
    console.log('SHOW:', this.requestCount());
  }

  hide() {
    this.requestCount.update((count) => Math.max(0, count - 1));
    console.log('HIDE:', this.requestCount());
  }
}
