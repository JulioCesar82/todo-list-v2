export class CreateTodoUseCase {
  constructor(todoRepository, eventBus) {
    this.todoRepository = todoRepository;
    this.eventBus = eventBus;
  }
  async execute({ description }) {
    if (!description || !description.trim()) {
      throw new Error("Description cannot be empty.");
    }
    const createdTodo = await this.todoRepository.add({ description });
    this.eventBus.dispatch("todo:created", createdTodo);
    return createdTodo;
  }
}
