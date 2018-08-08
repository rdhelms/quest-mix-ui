import { Injectable } from '@angular/core';
import { IBackground } from '../types/background.types';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  currentBackground?: IBackground;

  constructor() { }

  async saveBackground(background: IBackground) {
      localStorage.setItem('background', JSON.stringify(background));
  }

  async getBackground(/*id: number*/) {
      const loadedBackgroundString = localStorage.getItem('background');
      if (!loadedBackgroundString) {
          return null;
      } else {
          return JSON.parse(loadedBackgroundString) as IBackground;
      }
  }
}
