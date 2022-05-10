import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

// Liberação/não de acesso do backend (Liberado para geral k)
app.use(cors());

// Exemplo de restrição de acesso do cors
// app.use(cors({
//   origin: 'http://localhost:3000'
// }));

// Permite a interpretação de JSON
app.use(express.json());

// Utilização das rotas
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log('Http server running');
})