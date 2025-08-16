import { User, SessionServiceInterface } from '@project/core';
import { jwtDecode } from 'jwt-decode';

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