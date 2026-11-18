import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { Core } from '../Services/core';

export const successInterceptor: HttpInterceptorFn = (req, next) => {
  const core = inject(Core);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && req.method !== 'GET' && event.status === 200) {
        const serverMessage = (event.body as { message?: string | null } | null)?.message;

        if (serverMessage) {
          core._Sussess.next(serverMessage);

          setTimeout(() => {
            core._Sussess.next('');
          }, 4000);
        }
      }
    }),
  );
};
