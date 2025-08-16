export class RemoveTodoUseCase {
  constructor(todoRepository, eventBus) {
    this.todoRepository = todoRepository;
    this.eventBus = eventBus;
  }
  async execute({ todoId, todoDescription }) {
    await this.todoRepository.remove(todoId);
    this.eventBus.dispatch('todo:removed', { id: todoId, description: todoDescription });
    return todoId;
  }
}