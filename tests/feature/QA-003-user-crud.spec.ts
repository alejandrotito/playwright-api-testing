import { test, expect } from '@playwright/test';

test('QA-002', async ({ request }) => {

    //C

    const responseC = await request.post(
        'https://api.qaautomationlabs.com/v1/users',
        {
            data: {

                firstName: 'Ale',
                lastName: 'Martinez',
                username: 'tito.martinez',
                email: 'ale.tito@qalabs.dev',
                role: 'QA',
                status: 'invited',
                avatar: 'https://api.qaautomationlabs.com/v1/avatars/u1.svg'

            }
        }
    );

    expect(responseC.status()).toBe(201);

    const bodyC = await responseC.json();

    const idUser = bodyC.data.id;

    console.log(bodyC)


    expect(bodyC.data.id).toBe(idUser)
    expect(bodyC.data.firstName).toBe('Ale');

    //R

    const responseR = await request.get(
        `https://api.qaautomationlabs.com/v1/users/${idUser}`
    );


    expect(responseR.status()).toBe(200);

    const bodyR = await responseR.json();

    expect(bodyR.data.lastName).toBe('Martinez');
    expect(bodyR.email).toContain('@qalabs');

    //U

    const responseU = await request.patch(
        `https://api.qaautomationlabs.com/v1/users/${idUser}`,
        {
            data: {
                firstName: 'Alejandro',
                role: 'QA Analyst' 
            }
        }
    );


    expect(responseU.status()).toBe(202);

    const bodyU = await responseU.json();

    expect(bodyU.data.firstName).toBe('Alejandro');
    expect(bodyU.role).toBe('QA Analyst');


    const response = await request.get(
        `https://api.qaautomationlabs.com/v1/users/${idUser}`
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data.firstName).toBe('Alejandro');
    expect(body.role).toBe('QA Analyst');


    //D

    const responseD = await request.delete(
        `https://api.qaautomationlabs.com/v1/users/${idUser}`
    );

    expect(responseD.status()).toBe(204);


});