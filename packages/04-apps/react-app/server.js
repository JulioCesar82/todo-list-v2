const express = require("express");
const next = require("next");
const helmet = require("helmet");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Adicionar middlewares de segurança
  server.use(helmet());

  // Middleware para servir PWA corretamente
  server.use(express.static("public"));

  // Roteamento básico
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${port}`);
  });
});
