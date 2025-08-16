# Épico 01: Autenticação e Gerenciamento de Sessão

## Objetivo
Permitir que usuários acessem o sistema de forma segura, garantindo que apenas usuários autenticados possam interagir com as funcionalidades restritas.

## Mapa Funcional
- **US-001: Autenticação de Usuário:** O usuário deve ser capaz de se autenticar usando credenciais (login/senha). No sucesso, um token JWT é gerado e armazenado em um cookie seguro.
- **US-002: Tela Principal e Navegação:** Após o login, o usuário é direcionado para uma "casca" principal da aplicação, onde vê uma saudação personalizada e opções de navegação. Ele também tem a opção de fazer logout, o que destrói sua sessão.