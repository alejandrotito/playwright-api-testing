import { test, expect } from '@playwright/test';

test('Obtener producto por ID', async ({ request }) => {

    const response = await request.get(
        '/products/6'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(6);
});

test('Agregar un producto', async ({ request }) => {

    const response = await request.post(
        '/products', {
            data: {
                
                    "title": "Test Product",
                    "price": 99.99,
                    "description": "Producto creado desde Playwright",
                    "category": "electronics",
                    "image": "https://example.com/image.jpg"
                

            }
    }
    );

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.title).toBe("Test Product");
    expect(body.id).toEqual(expect.any(Number));
});

test('Obtener Todos los productos', async ({ request }) => {

    const response = await request.get(
        '/products'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    //expect(body.id).toBe(6);
});

test ('Modificar titulo del producto', async ({request}) => {

    const response = await request.put (
     
        '/products/6' , {

            data: {
                "title": "Nuevo Titulo Test Product",

            }
        } 
        
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.title).toBe("Nuevo Titulo Test Product");
    expect(body.id).toEqual(expect.any(Number));


});

test ('Eliminar producto', async ({request}) => {

    const response = await request.put (
     
        '/products/6'
        
    );

    
    expect(response.status()).toBe(200);

    const body = await response.json();

    
    expect(body.id).toEqual(expect.any(Number));


});

test('Consultar productos con parámetros', async ({ request }) => {

    const response = await request.get(
        
        '/products', {
        params: {
            limit: 5
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    
    expect(body).toHaveLength(5)

});

