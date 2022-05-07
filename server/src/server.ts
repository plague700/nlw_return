import express from 'express';
import { routes } from './routes';

const app = express();

// Permite a interpretação de JSON
app.use(express.json());

// Utilização das rotas
app.use(routes);

app.listen(3333, () => {
  console.log('Http server running');
})