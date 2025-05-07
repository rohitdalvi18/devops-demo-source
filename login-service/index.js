const express = require('express');
const auth = require('basic-auth');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse basic auth credentials
app.get("/login", (req, res) => {
  const { user, pass } = req.query;
  if (user === "admin" && pass === "password") {
    return res.json({ authenticated: true });
  }
  res.status(401).json({ authenticated: false });
});

app.listen(port, () => console.log(`login-service listening on ${port}`));
