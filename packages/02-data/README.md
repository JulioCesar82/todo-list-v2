# Pacote: @project/data

## Descrição

Este pacote contém as implementações concretas das interfaces definidas no pacote @project/core. Ele atua como uma ponte entre a nossa lógica de negócio pura e o "mundo exterior" (bancos de dados, APIs, localStorage, etc.).

*Princípio Fundamental:* A principal responsabilidade desta camada é a *implementação de detalhes. Ela sabe *como buscar ou salvar dados, mas não sabe por que esses dados são necessários.

## Estrutura

- */src/auth*: Contém as implementações para o domínio de autenticação, como o MockAuthRepository (que simula um banco de dados de usuários) e o SessionService (que gerencia o cookie de sessão).
- */src/todo*: Contém a implementação do InMemoryTodoRepository, que gerencia a lista de tarefas em memória para o MVP.
- */src/shared*: Contém serviços compartilhados que são detalhes de implementação, como o EventBusService.