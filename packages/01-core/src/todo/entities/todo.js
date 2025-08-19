export class Todo {
  constructor({ id, description, completed = false }) {
    this.id = id;
    this.description = description;
    this.completed = completed;
  }
}
