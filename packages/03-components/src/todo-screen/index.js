import { LitElement, html, css } from "lit";
import {
  CreateTodoUseCase,
  ListTodosUseCase,
  RemoveTodoUseCase,
} from "@project/core";
import { InMemoryTodoRepository, eventBus } from "@project/data";

export class TodoScreen extends LitElement {
  static styles = css`
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      border-bottom: 1px solid #eee;
    }
    .empty-state {
      color: #888;
      margin-top: 2rem;
      text-align: center;
    }
  `;
  static properties = {
    todos: { type: Array, state: true },
    isLoading: { type: Boolean, state: true },
  };

  constructor() {
    super();
    this.todos = [];
    this.isLoading = true;
    const repo = new InMemoryTodoRepository();
    this.listUC = new ListTodosUseCase(repo);
    this.createUC = new CreateTodoUseCase(repo, eventBus);
    this.removeUC = new RemoveTodoUseCase(repo, eventBus);
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadTodos();
  }

  async loadTodos() {
    this.isLoading = true;
    this.todos = await this.listUC.execute();
    this.isLoading = false;
  }

  async handleAddTodo(e) {
    e.preventDefault();
    const input = e.target.elements.description;
    const addButton = e.target.elements.addButton;
    if (!input.value.trim()) return;

    addButton.disabled = true;
    try {
      const newTodo = await this.createUC.execute({ description: input.value });
      this.todos = [...this.todos, newTodo];
      input.value = "";
    } finally {
      addButton.disabled = false;
    }
  }

  async handleRemoveTodo(todo) {
    const removedId = await this.removeUC.execute({
      todoId: todo.id,
      todoDescription: todo.description,
    });
    this.todos = this.todos.filter((t) => t.id !== removedId);
  }

  render() {
    if (this.isLoading) return html`<p>Carregando tarefas...</p>`;
    return html`
      <h2>Minhas Tarefas</h2>
      <form @submit=${this.handleAddTodo}>
        <input
          name="description"
          type="text"
          placeholder="O que precisa ser feito?"
          required
        />
        <button name="addButton" type="submit">Adicionar</button>
      </form>
      ${this.todos.length === 0
        ? html`<p class="empty-state">
            Você ainda não tem tarefas. Que tal adicionar a primeira?
          </p>`
        : html`<ul>
            ${this.todos.map(
              (todo) =>
                html`<li>
                  <span>${todo.description}</span
                  ><button @click=${() => this.handleRemoveTodo(todo)}>
                    Remover
                  </button>
                </li>`,
            )}
          </ul>`}
    `;
  }
}
customElements.define("todo-screen", TodoScreen);
