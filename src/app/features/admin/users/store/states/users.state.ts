import { User } from "../../../../../shared/models/admin-user.models";

export interface UsersState {
  users: User[];
  selectedUsers: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: UsersState = {
  users: [],
  selectedUsers: [],
  loading: false,
  error: null,
};

