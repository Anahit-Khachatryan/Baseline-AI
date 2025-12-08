import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

export interface LookupData {
  roles: string[];
  statuses: string[];
  departments: string[];
  countryCodes: string[];
}

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  // Simulate API delay
  private readonly delayMs = 200;

  // In a real application, these would come from an API
  private readonly lookupData: LookupData = {
    roles: ['Admin', 'Manager', 'Fleet Manager', 'Operator', 'Viewer'],
    statuses: ['Active', 'Inactive', 'Pending'],
    departments: [
      'Operations',
      'Fleet Management',
      'Safety',
      'IT',
      'Administration',
    ],
    countryCodes: ['+374', '+1', '+44', '+33', '+49', '+7'],
  };

  getLookups() {
    return of({ ...this.lookupData }).pipe(delay(this.delayMs));
  }

  getRoles() {
    return of([...this.lookupData.roles]).pipe(delay(this.delayMs));
  }

  getStatuses() {
    return of([...this.lookupData.statuses]).pipe(delay(this.delayMs));
  }

  getDepartments() {
    return of([...this.lookupData.departments]).pipe(delay(this.delayMs));
  }
}

