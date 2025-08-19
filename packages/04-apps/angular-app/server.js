const express = require("express");
const path = require("path");
const helmet = require("helmet");
const serveStatic = require("serve-static");

const app = express();

// Adicionar middlewares de segurança
app.use(helmet());

// Serve arquivos estáticos da pasta 'dist/your-angular-project'
const distDir = path.join(__dirname, "dist");
app.use(serveStatic(distDir));

// Roteamento do lado do servidor para suportar roteamento do Angular Router
app.get("*", function (req, res) {
  res.sendFile(path.join(distDir, "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
