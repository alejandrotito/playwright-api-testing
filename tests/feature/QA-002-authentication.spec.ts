import { test, expect } from '@playwright/test';

test('QA-002', async ({ request }) => {

    const responseLogin = await request.post(
        'https://api.qaautomationlabs.com/v1/auth/login',
        {
            headers: {
                Accept: 'application/json'

            },

            data: {

                "email": "qa@demo.io",         
                "password": "Password123"

            }
        }
    );

    expect(responseLogin.status()).toBe(200);

    const bodyLogin = await responseLogin.json();

    const token = bodyLogin.data.accessToken; 

    //Users

    const responseUsers = await request.get(
        'https://api.qaautomationlabs.com/v1/users',
        {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}` 

            },
        }
    );

    expect(responseUsers.status()).toBe(200);

    console.log(responseUsers);

    const bodyUsers = await responseUsers.json();
    
    console.log(bodyUsers);
    expect(bodyUsers).toBeDefined();
    expect(bodyUsers.data).not.toHaveLength(0);
    



});



