const express = require('express');
const app = express();
const port = process.env.PORT||3000;

app.get('/inventory', (req,res) => {
  res.json([{ sku:"A1", qty:100 }, { sku:"B2", qty:200 }]);
});

app.listen(port, ()=>console.log(`inventory-service on ${port}`));
