import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { User, CreateUserRequest, UpdateUserRequest } from "../../../../shared/models/admin-user.models";
import { generateMockUsers } from '../data/mock-users.data';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private mockUsers: User[] = generateMockUsers();
  private nextId = 26;

  // Simulate API delay
  private readonly delayMs = 300;

  getUsers() {
    return of([...this.mockUsers]).pipe(delay(this.delayMs));
  }

  getUserById(id: number) {
    const user = this.mockUsers.find((u) => u.id === id);
    return of(user ? { ...user } : null).pipe(delay(this.delayMs));
  }

  createUser(userData: CreateUserRequest) {
    const newUser: User = {
      id: this.nextId++,
      ...userData,
      createdAt: new Date().toISOString(),
    };
    this.mockUsers.push(newUser);
    return of({ ...newUser }).pipe(delay(this.delayMs));
  }

  updateUser(userData: UpdateUserRequest) {
    const index = this.mockUsers.findIndex((u) => u.id === userData.id);
    if (index === -1) {
      throw new Error(`User with id ${userData.id} not found`);
    }
    this.mockUsers[index] = {
      ...this.mockUsers[index],
      ...userData,
    };
    return of({ ...this.mockUsers[index] }).pipe(delay(this.delayMs));
  }

  deleteUser(id: number) {
    const index = this.mockUsers.findIndex((u) => u.id === id);
    if (index === -1) {
      return of(false).pipe(delay(this.delayMs));
    }
    this.mockUsers.splice(index, 1);
    return of(true).pipe(delay(this.delayMs));
  }

  deleteUsers(ids: number[]) {
    ids.forEach((id) => {
      const index = this.mockUsers.findIndex((u) => u.id === id);
      if (index !== -1) {
        this.mockUsers.splice(index, 1);
      }
    });
    return of(true).pipe(delay(this.delayMs));
  }
}

