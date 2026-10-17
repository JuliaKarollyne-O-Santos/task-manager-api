const request = require('supertest');
const app = require('../src/app');
const store = require('../src/store/taskStore');

beforeEach(() => store.reset());

describe('POST /tasks (Issue #1)', () => {
  it('cria uma nova tarefa', async () => {
    const res = await request(app).post('/tasks').send({ title: 'Estudar Lean' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 1, title: 'Estudar Lean', completed: false });
  });

  it('retorna 400 sem título', async () => {
    const res = await request(app).post('/tasks').send({});
    expect(res.status).toBe(400);
  });
});

describe('GET /tasks (Issue #2)', () => {
  it('lista as tarefas', async () => {
    await request(app).post('/tasks').send({ title: 'A' });
    await request(app).post('/tasks').send({ title: 'B' });
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('busca uma tarefa pelo id', async () => {
    await request(app).post('/tasks').send({ title: 'A' });
    const res = await request(app).get('/tasks/1');
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('A');
  });

  it('retorna 404 para id inexistente', async () => {
    const res = await request(app).get('/tasks/99');
    expect(res.status).toBe(404);
  });
});

describe('PUT /tasks/:id (Issue #3)', () => {
  it('atualiza uma tarefa', async () => {
    await request(app).post('/tasks').send({ title: 'A' });
    const res = await request(app).put('/tasks/1').send({ title: 'A editada', completed: true });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ title: 'A editada', completed: true });
  });

  it('retorna 404 ao atualizar tarefa inexistente', async () => {
    const res = await request(app).put('/tasks/99').send({ title: 'X' });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /tasks/:id (Issue #4)', () => {
  it('deleta uma tarefa', async () => {
    await request(app).post('/tasks').send({ title: 'A' });
    const res = await request(app).delete('/tasks/1');
    expect(res.status).toBe(204);
    const list = await request(app).get('/tasks');
    expect(list.body).toHaveLength(0);
  });

  it('retorna 404 ao deletar tarefa inexistente', async () => {
    const res = await request(app).delete('/tasks/99');
    expect(res.status).toBe(404);
  });
});
