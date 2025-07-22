import express from 'express';
import { AngularNodeAppEngine, createNodeRequestHandler, isMainModule, writeResponseToNodeResponse } from '@angular/ssr/node';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
app.use(express.json());

// --- NUEVAS RUTAS RESTFUL ---
app.get('/estaciones', async (req, res) => { res.json([]); });
app.get('/estaciones/:id', async (req, res) => { res.json({}); });
app.get('/bicicletas', async (req, res) => { res.json([]); });
app.post('/alquilar', async (req, res) => { res.json({}); });
app.post('/devolver', async (req, res) => { res.json({ msg: 'Bicicleta devuelta correctamente' }); });
app.get('/api/book', async (req, res) => { res.json([]); });
// --- FIN DE NUEVAS RUTAS ---

const angularApp = new AngularNodeAppEngine();

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response: any) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
