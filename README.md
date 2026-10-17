# Task Manager API

API REST simples para **gerenciamento de tarefas**, desenvolvida como projeto acadêmico para aplicar conceitos de **gestão ágil** com práticas **Lean** e **Kanban**, usando GitHub Issues e GitHub Projects.

## Propósito

Entregar um **MVP (Produto Mínimo Viável)** que permita criar, visualizar, atualizar e deletar tarefas (CRUD). Funcionalidades extras (login, banco de dados, prioridades, prazos) ficaram fora do MVP para evitar desperdício e entregar valor o quanto antes.

## Tecnologias

- **Node.js**: ambiente de execução JavaScript
- **Express**: framework para criar a API REST
- **Jest** + **Supertest**: testes automatizados dos endpoints
- **Git / GitHub**: versionamento, Issues (backlog) e Projects (quadro Kanban)

## Estrutura

```
task-manager-api/
├── src/
│   ├── app.js              # configuração do Express
│   ├── server.js           # inicia o servidor
│   ├── routes/taskRoutes.js
│   └── store/taskStore.js  # armazenamento em memória (MVP)
└── test/
    └── tasks.test.js       # testes automatizados
```

## Como rodar

```bash
npm install
npm start      # sobe em http://localhost:3000
npm test       # roda os testes
```

## Endpoints

| Método | Rota         | Descrição                  | Issue |
|--------|--------------|----------------------------|-------|
| POST   | /tasks       | Cria uma nova tarefa       | #1    |
| GET    | /tasks       | Lista todas as tarefas     | #2    |
| GET    | /tasks/:id   | Busca uma tarefa pelo id   | #2    |
| PUT    | /tasks/:id   | Atualiza uma tarefa        | #3    |
| DELETE | /tasks/:id   | Deleta uma tarefa          | #4    |

Exemplo de corpo para criar uma tarefa:

```json
{ "title": "Estudar Kanban", "description": "Ler sobre WIP" }
```

## Gestão do projeto

- **Backlog**: GitHub Issues
- **Quadro Kanban**: GitHub Projects (Backlog → Em progresso → Em revisão → Concluído)

## Integrantes

- Julia Karollyne de Oliveira dos Santos
- Ana Clara Santos Perira
- Cauã Mendrot Sant'Anna
- Daniel do Prado Bettin
