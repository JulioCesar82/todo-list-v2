import jwt from 'jsonwebtoken';
const JWT_SECRET = 'dev-secret-key-change-in-production';

export class AuthenticateUserUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }
  async execute({ login, password }) {
    const user = await this.authRepository.authenticate(login, password);
    if (!user) return null;

    const payload = { sub: user.id, name: user.name, iss: 'urn:project:api', aud: 'urn:project:app' };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    
    return { user, token };
  }
}