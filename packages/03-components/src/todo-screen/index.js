
import {
  CreateTodoUseCase,
  ListTodosUseCase,
  RemoveTodoUseCase,
} from "@project/core";
import { InMemoryTodoRepository, eventBus } from "@project/data";

class TodoScreen extends LitElement {
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
    this.attachTemplates();
  }

  attachTemplates() {
    // Adiciona o style template se não estiver presente
    if (!document.getElementById('todo-screen-style')) {
      import('./todo-screen-style.html');
    }
    // Adiciona o html template se não estiver presente
    if (!document.getElementById('todo-screen-template')) {
      import('./todo-screen-template.html');
    }
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
    // Clona o template externo
    const styleTemplate = document.getElementById('todo-screen-style');
    const htmlTemplate = document.getElementById('todo-screen-template');
    let styleContent = '';
    let htmlContent = '';
    if (styleTemplate) {
      styleContent = styleTemplate.innerHTML;
    }
    if (htmlTemplate) {
      htmlContent = htmlTemplate.innerHTML;
    }
    // Renderiza o template e insere a lista de tarefas dinamicamente
    return html`
      ${styleContent ? html([styleContent]) : ''}
      <div>
        ${htmlContent ? html([htmlContent]) : ''}
        ${this.todos.length === 0
          ? html`<p class="empty-state">
              Você ainda não tem tarefas. Que tal adicionar a primeira?
            </p>`
          : html`<ul>
              ${this.todos.map(
                (todo) =>
                  html`<li>
                    <span>${todo.description}</span>
                    <button @click=${() => this.handleRemoveTodo(todo)}>
                      Remover
                    </button>
                  </li>`
              )}
            </ul>`}
      </div>
    `;
  }
}

customElements.define("todo-screen", TodoScreen);
