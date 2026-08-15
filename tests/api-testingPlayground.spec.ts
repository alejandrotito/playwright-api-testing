import { test, expect } from '@playwright/test';

test('Obtener Usuarios', async ({ request }) => {

    const response = await request.get(               // en la constante response agurado (await) y guardo toda la respuesta del request que estoy haciendo sobre esa url
        'https://api.qaautomationlabs.com/v1/users'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();             // en la variable body tomo el contenido/body de esa respuesta y conviértelo/interprétalo como JSON.”

    expect(body.data).toBeDefined();

    console.log(body.data);
});

test('Asertions user 3', async ({ request }) => {

    const response = await request.get(
        'https://api.qaautomationlabs.com/v1/users'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data[2].id).toBe(3);

    expect(body.data[2].firstName).toBe('Diego');

    expect(body.data[2].role).toBe('analyst');
});

test('Buscar usuario', async ({ request }) => {

    const response = await request.get(
        'https://api.qaautomationlabs.com/v1/users'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    const usuario = body.data.find((user: any) => user.firstName === 'Diego');  // Busco en data el primer usuario cuyo firstName sea "Diego" y guardo el objeto encontrado en usuario.

    console.log(usuario.id);                                                    // any significa que, por ahora, le estamos diciendo a TypeScript que user puede ser de cualquier tipo.


});

test('Mas asertions sobre diego', async ({ request }) => {

    const response = await request.get(
        'https://api.qaautomationlabs.com/v1/users'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    const usuario = body.data.find((user: any) => user.firstName === 'Diego');

    expect(usuario).toBeDefined();

    expect(usuario.firstName).toEqual('Diego');

    expect(usuario.role).not.toBe('admin');

    expect(usuario.email).toContain('@');

    console.log(usuario.id);

    //Mas asertions

    expect(usuario.id).toEqual(expect.any(Number));
    expect(usuario.email).not.toBe('');
    expect(body.data).not.toHaveLength(0);
    expect(usuario.email).toBeTruthy();


});

test('Obtener usuario por ID con variable', async ({ request }) => {

    const userId = 3;

    const response = await request.get(
        `https://api.qaautomationlabs.com/v1/users/${userId}` //Para que ${userId} funcione, necesitás backticks ` `. Con comillas simples '{userId}' JavaScript lo interpreta literalmente
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data.id).toBe(userId);  // aqui no va la posicion del array entre [] porque ya mando el id del usuairo entonces me devuelve su objeto solamente, no necesito decirle cual es


});

test('Consultar usuarios con parámetros', async ({ request }) => {

    const response = await request.get(
        'https://api.qaautomationlabs.com/v1/users',
        {
            params: {
                limit: 5
            }
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data).toHaveLength(5);

});

test('Consultar usuarios con parámetros y headers', async ({ request }) => {

    const response = await request.get(
        'https://api.qaautomationlabs.com/v1/users',
        {
            params: {
                limit: 5
            },

            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }

        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data).toHaveLength(5);

});

test('Consultar usuarios con Authorization', async ({ request }) => {

    const response = await request.get(
        'https://api.qaautomationlabs.com/v1/users',
        {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer lfn23458wkfn2874248gi7'
            }
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body)

});

test('login ok', async ({ request }) => {

    const response = await request.post(
        'https://api.qaautomationlabs.com/v1/auth/login',
        {
            headers: {
                Accept: 'application/json'

            },

            data: {

                "email": "qa@demo.io",          //credenciales de prueba válidos
                "password": "Password123"

            }
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body)

    const token = body.data.accessToken; //en la variable token guardo el token que obtuve al loguearme exitosamente

    console.log(token);

});

test('Chaining', async ({ request }) => {

    const response = await request.post(
        'https://api.qaautomationlabs.com/v1/auth/login',
        {
            headers: {
                Accept: 'application/json'

            },

            data: {

                "email": "qa@demo.io",          //credenciales de prueba válidos
                "password": "Password123"

            }
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

   // console.log(body)

    const token = body.data.accessToken; //en la variable token guardo el token que obtuve al loguearme exitosamente

    //console.log(token); //veo ese token

    // siguiente endpoint

    const response2 = await request.get(
        'https://api.qaautomationlabs.com/v1/users',
        {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}` //envio el token obtenido anteriormente

            },
        }
    );

    expect(response2.status()).toBe(200);

    const body2 = await response2.json();

    console.log(token)



});