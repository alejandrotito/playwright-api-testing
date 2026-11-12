import { test, expect } from '@playwright/test';

test('QA-005', async ({ request }) => {

    const email = `sofia-${Date.now()}@test.com`;

    const response = await request.post(
        'http://localhost:3000/api/users',
        {
            data: {
                first_name: 'Sofia',
                last_name: 'Martinez',
                email: email
            }
        }
    );

    expect(response.status()).toBe(201);

    const body = await response.json();

    const idUser = body.id;

    console.log(body)

    const responseR = await request.get(
        'http://localhost:3000/api/users'
    );


    expect(responseR.status()).toBe(200);

    const bodyR = await responseR.json();

    const usuario = bodyR.find((user: any) => user.id === idUser);

    expect(usuario).toBeDefined();
    expect(usuario.email).toBe(email);
    expect(usuario.last_name).toBe('Martinez');

});