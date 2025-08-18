import { AuthRepository, User } from '@project/core';

export class MockAuthRepository extends AuthRepository {
  async authenticate(login, password) {
    // Simula uma pequena latência de rede
    await new Promise(resolve => setTimeout(resolve, 200));
    if (login === 'admin' && password === 'admin') {
      return new User({ id: 'uuid-admin-001', name: 'Admin User', login: 'admin' });
    }
    return null;
  }
}
