import * as jose from "jose";

const JWT_SECRET = new TextEncoder().encode(
  "dev-secret-key-change-in-production",
);

export class AuthenticateUserUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }
  async execute({ login, password }) {
    const user = await this.authRepository.authenticate(login, password);
    if (!user) return null;

    const payload = {
      sub: user.id,
      name: user.name,
      iss: "urn:project:api",
      aud: "urn:project:app",
    };
    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(JWT_SECRET);

    return { user, token };
  }
}
