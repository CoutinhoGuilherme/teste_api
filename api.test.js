const supertest = require('supertest');
const {app, server, connection} = require('./index.js'); // Importe seu aplicativo Express

let idCriado;

describe('Teste GET /users', () => {
  it('deve responder com status 200', async () => {
    const response = await supertest(app).get('/users');
    expect(response.statusCode).toBe(200);

    expect(response.body).toBeInstanceOf(Array)
    response.body.array.forEach(element => {
      expect(element).toHaveProperty("name");    
    });
    
  });
});

describe('Teste Post /users', () => {
  it('deve responder com status 201', async () => {
    const response = await supertest(app).post('/users', {name: "Fulano de Tal", email: "fulano@gmail.com"});
    expect(response.statusCode).toBe(201);
    idCriado = response.body.id;
    expect(response.body).toHaveProperty("id");    
    expect(response.body.id).toBeGreaterThan(0);    
    console.log("O id criado foi: " + response.id)
  });
});

describe('Atualiza usuario Put /users', () => {
  it('deve responder com status 204', async () => {
    const response = await supertest(app).put('/users/1', {name: "Fulano de Tal", email: "fulano@gmail.com"});
    expect(response.statusCode).toBe(204);
  });
});

describe('Deleta usuario /users', () => {
  it('deve responder com status 204', async () => {
    const response = await supertest(app).delete('/users/1' + idCriado);
    expect(response.statusCode).toBe(204);
  });
});

afterAll(() => {
  server.close();
  connection.end();
})
