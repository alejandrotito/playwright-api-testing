import { test, expect } from '@playwright/test';

test('GET - Health check de nuestra API', async ({ request }) => {

    const response = await request.get('http://localhost:3000/health');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.message).toBe('QA API funcionando correctamente');

});

test('GET - Obtener listado de usuarios desde MySQL', async ({ request }) => {

    const response = await request.get('http://localhost:3000/api/users');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveLength(6);
    expect(body[0].first_name).toBe('Juan');
    expect(body[0].email).toBe('juan@test.com');

});
