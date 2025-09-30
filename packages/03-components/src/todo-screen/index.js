
import { LitElement, html } from "lit";
import {
  CreateTodoUseCase,
  ListTodosUseCase,
  RemoveTodoUseCase,
} from "@project/core";
import { InMemoryTodoRepository, eventBus } from "@project/data";
import { loadAndAppendTemplate } from '../utils/template-loader.js';

class TodoScreen extends LitElement {
  static properties = {
    todos: { type: Array, state: true },
    isLoading: { type: Boolean, state: true },

    styleTemplateId: { type: String },
    htmlTemplateId: { type: String },
  };

  constructor() {
    super();

    this.todos = [];
    this.isLoading = true;
    
    this.styleTemplateId = 'todo-screen-style';
    this.htmlTemplateId = 'todo-screen-template';
    
    const repo = new InMemoryTodoRepository();
    this.listUC = new ListTodosUseCase(repo);
    this.createUC = new CreateTodoUseCase(repo, eventBus);
    this.removeUC = new RemoveTodoUseCase(repo, eventBus);
    
    this.attachTemplates();
  }

  attachTemplates() {
    loadAndAppendTemplate(`./${this.styleTemplateId}.html`, this.styleTemplateId);
    loadAndAppendTemplate(`./${this.htmlTemplateId}.html`, this.htmlTemplateId);
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
    const styleTemplate = document.getElementById(this.styleTemplateId);
    const htmlTemplate = document.getElementById(this.htmlTemplateId);
    
    let styleContent = '';
    let htmlContent = '';

    if (!styleTemplate) {
      console.error(`Template with ID '${this.styleTemplateId}' not found.`);
      return html`<p>Error: Style template not found.</p>`;
    }
    if (!htmlTemplate) {
      console.error(`Template with ID '${this.htmlTemplateId}' not found.`);
      return html`<p>Error: HTML template not found.</p>`;
    }

    styleContent = styleTemplate.innerHTML;
    htmlContent = htmlTemplate.innerHTML;

    // Renderiza o template e insere a lista de tarefas dinamicamente
    return html`
      ${styleContent ? html([styleContent]) : ''}
      <div>
        ${htmlContent ? html([htmlContent]) : ''}
        ${this.todos.length === 0
          ? html`<p slot="empty-state" class="empty-state">
              Você ainda não tem tarefas. Que tal adicionar a primeira?
            </p>`
          : html`<ul slot="todo-list">
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
