const express = require('express');
const app     = express();
const port    = process.env.PORT || 3000;

// Home page
app.get('/', (req, res) => {
  res.set('Content-Type','text/html');
  res.send(`<!DOCTYPE html>
<html><head><title>Demo</title></head><body>
  <h1>DevOps Demo</h1>
  <ul>
    <li><a href="/login?user=admin&pass=password">Test Login</a></li>
    <li><a href="/orders">View Orders</a></li>
    <li><a href="/inventory">View Inventory</a></li>
  </ul>
</body></html>`);
});

// Login route – calls login-service and shows result
app.get('/login', async (req, res) => {
  const { user, pass } = req.query;
  try {
    const r = await fetch(`http://login:3000/login?user=${user}&pass=${pass}`);
    const json = await r.json();
    res.set('Content-Type','text/html');
    res.send(`<h1>Login</h1>
      <p>Authenticated: ${json.authenticated}</p>
      <a href="/">Back</a>`);
  } catch (e) {
    res.status(500).send('<h1>Error calling login-service</h1>');
  }
});

// Orders route – calls order-service and renders list
app.get('/orders', async (req, res) => {
  try {
    const r = await fetch('http://order:3000/orders');
    const orders = await r.json();
    const list = orders.map(o => `<li>Order ${o.id}: ${o.item}</li>`).join('');
    res.set('Content-Type','text/html');
    res.send(`<h1>Orders</h1><ul>${list}</ul><a href="/">Back</a>`);
  } catch (e) {
    console.log(e);
    res.status(500).send('<h1>Error calling order-service</h1>');
  }
});

// Inventory route – calls inventory-service and renders list
app.get('/inventory', async (req, res) => {
  try {
    const r = await fetch('http://inventory:3000/inventory');
    const inv = await r.json();
    const list = inv.map(i => `<li>${i.sku}: ${i.qty}</li>`).join('');
    res.set('Content-Type','text/html');
    res.send(`<h1>Inventory</h1><ul>${list}</ul><a href="/">Back</a>`);
  } catch {
    res.status(500).send('<h1>Error calling inventory-service</h1>');
  }
});

// 404 catch-all (optional)
app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1><a href="/">Home</a>');
});

app.listen(port, () => console.log(`frontend on ${port}`));
