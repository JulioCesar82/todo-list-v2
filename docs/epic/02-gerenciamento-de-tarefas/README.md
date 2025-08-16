# Épico 02: Gerenciamento de Tarefas (TODOs)

## Objetivo
Prover a funcionalidade principal do MVP, permitindo que os usuários gerenciem uma lista de tarefas. Este épico também serve como um "teste de estresse" para a arquitetura, validando a comunicação desacoplada entre componentes.

## Mapa Funcional
- **US-003: Gerenciamento de Tarefas com Notificação Global:** O usuário pode criar, visualizar e remover tarefas. Cada ação de criação ou remoção dispara um evento global que é capturado por um widget de notificação, informando o usuário sobre o resultado da sua ação.