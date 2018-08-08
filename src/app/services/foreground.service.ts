import { Injectable } from '@angular/core';
import { IForeground } from '../types/foreground.types';

@Injectable({
  providedIn: 'root'
})
export class ForegroundService {

  currentForeground?: IForeground;

  constructor() { }

  async saveForeground(foreground: IForeground) {
      localStorage.setItem('foreground', JSON.stringify(foreground));
  }

  async getForeground(/*id: number*/) {
      const loadedForegroundString = localStorage.getItem('foreground');
      if (!loadedForegroundString) {
          return null;
      } else {
          return JSON.parse(loadedForegroundString) as IForeground;
      }
  }
}
