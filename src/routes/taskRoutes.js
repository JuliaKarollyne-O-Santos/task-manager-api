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

module.exports = router;
