const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/orders', (req, res) => {
  res.json([{ id:1, item:"Apple" }, { id:2, item:"Banana" }]);
});



app.listen(port, () => console.log(`order-service on ${port}`));
