'use strict';

test('Deve retornar status code 200 ao realizar GET no path /api/v1/status', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status');
  expect(response.status).toBe(200);
});
