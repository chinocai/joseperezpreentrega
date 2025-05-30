const [,, method, resource, ...args] = process.argv;

const BASE_URL = 'https://fakestoreapi.com';

async function main() {
  try {
    if (method === 'GET' && resource === 'products') {
      if (args.length === 0) {
        // GET todos los productos
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        console.log(data);
      } else {
        // GET especifica un producto
        const productId = args[0];
        const res = await fetch(`${BASE_URL}/products/${productId}`);
        const data = await res.json();
        console.log(data);
      }
    }

    else if (method === 'POST' && resource === 'products') {
      const [title, price, category] = args;

      if (!title || !price || !category) {
        console.error('Faltan argumentos. Uso: npm run start POST products <title> <price> <category>');
        return;
      }

      const newProduct = {
        title,
        price: parseFloat(price),
        category,
        description: 'Producto generado desde FakeStore API',
        image: 'https://i.pravatar.cc'
      };

      const res = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });

      const data = await res.json();
      console.log(data);
    }

    else if (method === 'DELETE' && resource.startsWith('products/')) {
      const productId = resource.split('/')[1];

      const res = await fetch(`${BASE_URL}/products/${productId}`, {
        method: 'DELETE'
      });

      const data = await res.json();
      console.log(data);
    }

    else {
      console.log('Comando no reconocido. Revisa el formato.');
    }

  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
