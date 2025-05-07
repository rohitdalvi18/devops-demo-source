const e = require('express');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Home page
app.get('/', (req, res) => {
  const color = process.env.ACTIVE_COLOR || 'unknown';
  console.log(`Active version: ${color}`);
  res.set('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html><head><title>DevOps Demo</title></head><body>
  <h1>DevOps Demo</h1>
   <p>Current Active Version: <strong style="color:${color}">${color.toUpperCase()}</strong></p>
  <ul>
    <li><a href="/login?user=admin&pass=password">Test Login</a></li>
    <li><a href="/orders">View Orders</a></li>
    <li><a href="/inventory">View Inventory</a></li>
  </ul>
</body></html>`);
});

// Login route – calls login-service and shows result
app.get('/login', async (req, res) => {
  const { user, pass, q } = req.query;
  let color = 'red'
  let img = 'https://media.makeameme.org/created/when-your-login.jpg';

  try {
    console.log(`Query param q: ${q}`);

    const r = await fetch(`http://login/login?user=${user}&pass=${pass}`);
    const json = await r.json();

    if (json.authenticated) {
      color = 'green';
      img = 'https://jasonstcyr.com/wp-content/uploads/2020/12/maxresdefault1.jpg';
    }
    if (q === 'json') {
      res.json(json);
    } else {
    res.set('Content-Type', 'text/html');
    res.send(`<body style="background-color: ${color}; color: white"><h1>Login</h1>
      <p>Authenticated: ${json.authenticated}</p>
      <img src="${img}" alt="Image" style="width: 500px; height: auto;">
      <a href="/">Back</a></body>`);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('<h1>Error calling login-service</h1>');
  }
});

// Orders route – calls order-service and renders list
app.get('/orders', async (req, res) => {
  try {
    const { q } = req.query;
    console.log(`Query param q: ${q}`);

    const r = await fetch('http://order/orders');
    const orders = await r.json();

    if (q === 'json') {
      res.json(orders);
    } else {
      const list = orders.map(o => `<li>Order ${o.id}: ${o.item}</li>`).join('');
      res.set('Content-Type', 'text/html');
      res.send(`<h1>Orders</h1><ul>${list}</ul><a href="/">Back</a>`);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('<h1>Error calling order-service</h1>');
  }
});

// Inventory route – calls inventory-service and renders list
app.get('/inventory', async (req, res) => {
  try {
    const { q } = req.query;
    console.log(`Query param q: ${q}`);

    const r = await fetch('http://inventory/inventory');
    const inv = await r.json();
    if (q === 'json') {
      res.json(inv);
    } else {
      const list = inv.map(i => `<li>${i.sku}: ${i.qty}</li>`).join('');
      res.set('Content-Type', 'text/html');
      res.send(`<h1>Inventory</h1><ul>${list}</ul><a href="/">Back</a>`);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('<h1>Error calling inventory-service</h1>');
  }
});

// 404 catch-all (optional)
app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1><a href="/">Home</a>');
});

app.listen(port, () => console.log(`frontend on ${port}`));
