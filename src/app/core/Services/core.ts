import { Injectable, Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Core {
  _Sussess = new BehaviorSubject<string>('');
}
