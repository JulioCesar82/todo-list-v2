const path = require("path");
const express = require("express");
const serveStatic = require("serve-static");

const app = express();

app.use((req, res, next) => {
  // Implementar cabeçalhos de segurança
  res.setHeader("Content-Security-Policy", "default-src 'self';");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Serve arquivos estáticos da pasta 'dist'
const staticFileMiddleware = serveStatic(path.join(__dirname, "dist"));
app.use(staticFileMiddleware);

// Roteamento do lado do servidor para suportar roteamento do Vue Router
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

// Porta onde o servidor irá escutar
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
