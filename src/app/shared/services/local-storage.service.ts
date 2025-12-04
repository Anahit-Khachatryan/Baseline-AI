import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  set(key: string, value: any) {
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
      return;
    }
    const stringify = JSON.stringify(value);
    localStorage.setItem(key, stringify);
  }

  get(key: string) {
    return localStorage.getItem(key) || null; //add checking and generic type
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

}
