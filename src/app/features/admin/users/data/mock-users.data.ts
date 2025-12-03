import { User } from "../../../../shared/models/admin-user.models";

export const generateMockUsers = (): User[] => {
  const firstNames = [
    'John',
    'Jane',
    'Michael',
    'Sarah',
    'David',
    'Emily',
    'Robert',
    'Jessica',
    'William',
    'Amanda',
    'James',
    'Lisa',
    'Richard',
    'Jennifer',
    'Joseph',
  ];
  const lastNames = [
    'Doe',
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
    'Hernandez',
    'Lopez',
    'Wilson',
    'Anderson',
  ];
  const roles = ['Admin', 'Manager', 'Fleet Manager', 'Operator', 'Viewer'];
  const statuses: User['status'][] = ['Active', 'Inactive', 'Pending'];
  const departments = [
    'Operations',
    'Fleet Management',
    'Safety',
    'IT',
    'Administration',
  ];

  return Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    email: `user${i + 1}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    department:
      departments[Math.floor(Math.random() * departments.length)],
    createdAt: new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
    ).toISOString(),
  }));
};

