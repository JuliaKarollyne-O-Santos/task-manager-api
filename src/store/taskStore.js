// Armazenamento em memória: decisão Lean para o MVP.
// Banco de dados fica para uma próxima iteração (evita desperdício agora).
let tasks = [];
let nextId = 1;

function create({ title, description }) {
  const task = {
    id: nextId++,
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

function findAll() {
  return tasks;
}

function findById(id) {
  return tasks.find((t) => t.id === id);
}

function update(id, data) {
  const task = findById(id);
  if (!task) return null;
  if (data.title !== undefined) task.title = data.title.trim();
  if (data.description !== undefined) task.description = data.description;
  if (data.completed !== undefined) task.completed = data.completed;
  task.updatedAt = new Date().toISOString();
  return task;
}

function remove(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

function reset() {
  tasks = [];
  nextId = 1;
}

module.exports = { create, findAll, findById, update, remove, reset };
