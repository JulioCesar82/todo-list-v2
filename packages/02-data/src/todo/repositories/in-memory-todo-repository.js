import { Todo, TodoRepositoryInterface } from '@project/core';

let instance;

export class InMemoryTodoRepository extends TodoRepositoryInterface {
  constructor() {
    super();
    if (instance) return instance;

    this.todos = [
        new Todo({ id: '1', description: 'Revisar arquitetura do projeto', completed: true }),
        new Todo({ id: '2', description: 'Implementar a tela de TODOs' })
    ];
    instance = this;
  }

  async getAll() {
    return [...this.todos];
  }

  async add(data) {
    const newTodo = new Todo({ ...data, id: Date.now().toString() });
    this.todos.push(newTodo);
    return newTodo;
  }

  async remove(id) {
    this.todos = this.todos.filter(t => t.id !== id);
  }
}