import { User } from '../entities/user.js';

export class SessionServiceInterface {
  /** @returns {User|null} */
  getUser() { throw new Error("Method not implemented."); }
  /** @returns {boolean} */
  isAuthenticated() { throw new Error("Method not implemented."); }
  /** @returns {Promise<void>} */
  async logout() { throw new Error("Method not implemented."); }
  /** @param {function(string): void} callback */
  onChange(callback) { throw new Error("Method not implemented."); }
}