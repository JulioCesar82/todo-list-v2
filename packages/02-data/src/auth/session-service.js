import { User, SessionServiceInterface } from '@project/core';
import { jwtDecode } from 'jwt-decode';
import { SignJWT } from 'jose';

class SessionService extends SessionServiceInterface {
  constructor() {
    super();
    this.user = null;
    this.listeners = [];
    this._initialize();
  }

  _initialize() {
    try {
      const token = document.cookie.match(/(^| )session_token=([^;]+)/)?.[2];
      if (token && (jwtDecode(token).exp * 1000 > Date.now())) {
        const decoded = jwtDecode(token);
        this.user = new User({ id: decoded.sub, name: decoded.name, login: '' });
      }
    } catch (e) {
      this.user = null;
    }
  }

  getUser() { return this.user; }
  isAuthenticated() { return !!this.user; }

  async login(user) {
    this.user = user;
    const secret = new TextEncoder().encode('secret');
    const token = await new SignJWT({ sub: user.id, name: user.name })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secret);
    document.cookie = `session_token=${token}; Path=/; SameSite=Strict; Secure`;
    this.listeners.forEach(callback => callback('logged-in'));
  }

  async logout() {
    this.user = null;
    document.cookie = 'session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.listeners.forEach(callback => callback('logged-out'));
  }
  
  onChange(callback) {
    this.listeners.push(callback);
    return () => {
        const index = this.listeners.indexOf(callback);
        if (index > -1) this.listeners.splice(index, 1);
    };
  }
}

export const sessionService = new SessionService();
