const express = require('express');
const app = express();
const port = process.env.PORT||3000;

app.get('/inventory', (req,res) => {
  res.json([{ sku:"Apple", qty:100 }, { sku:"Banana", qty:200 },{ sku:"Mango", qty:300 }]);
});


app.listen(port, ()=>console.log(`inventory-service on ${port}`));
