export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  phone: string;
  department: string;
  createdAt: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  phone: string;
  department: string;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: number;
}


