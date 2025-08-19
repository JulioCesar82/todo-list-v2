export class ListTodosUseCase {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }
  async execute() {
    return this.todoRepository.getAll();
  }
}
