const express = require('express');
const store = require('../store/taskStore');

const router = express.Router();

// Issue #1 - Criar endpoint para adicionar uma nova tarefa
router.post('/', (req, res) => {
  const { title, description } = req.body || {};
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'O campo "title" é obrigatório.' });
  }
  const task = store.create({ title: title.trim(), description });
  return res.status(201).json(task);
});

// Issue #2 - Criar endpoint para listar tarefas
router.get('/', (req, res) => {
  res.json(store.findAll());
});

router.get('/:id', (req, res) => {
  const task = store.findById(Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });
  return res.json(task);
});

// Issue #3 - Criar endpoint para atualizar uma tarefa
router.put('/:id', (req, res) => {
  const { title, description, completed } = req.body || {};
  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    return res.status(400).json({ error: 'O campo "title" não pode ficar vazio.' });
  }
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'O campo "completed" deve ser true ou false.' });
  }
  const task = store.update(Number(req.params.id), { title, description, completed });
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });
  return res.json(task);
});

// Issue #4 - Criar endpoint para deletar uma tarefa
router.delete('/:id', (req, res) => {
  const removed = store.remove(Number(req.params.id));
  if (!removed) return res.status(404).json({ error: 'Tarefa não encontrada.' });
  return res.status(204).send();
});

module.exports = router;
