import { inject, Injectable, Service } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class Sussess {
  private messageService = inject(MessageService);

  success(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'نجاح',
      detail: message,
      life: 3000,
    });
  }
}
