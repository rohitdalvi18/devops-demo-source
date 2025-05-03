const express = require('express');
const auth = require('basic-auth');
const app = express();
const port = process.env.PORT || 3000;

app.get('/login', (req, res) => {
  const user = auth(req);
  if (user && user.name === 'admin' && user.pass === 'password') {
    res.json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

app.listen(port, () => console.log(`login-service listening on ${port}`));
