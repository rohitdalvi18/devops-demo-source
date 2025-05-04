const express = require('express');
const app = express();
const port = process.env.PORT||3000;

app.get('/inventory', (req,res) => {
  res.json([{ sku:"Apple", qty:100 }, { sku:"Banana", qty:200 }]);
});

// app.get('/inventory', (req, res) => {
//   // Explicitly set HTML content type
//   res.set('Content-Type', 'text/html');      // [1]
//   // Send a simple HTML response
//   res.send('<h1>Inventory List</h1><p>Here are your items…</p>');
// });


app.listen(port, ()=>console.log(`inventory-service on ${port}`));
