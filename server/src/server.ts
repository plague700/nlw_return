import express from 'express';
import { prisma } from './prisma';


const app = express();

// Permite a interpretação de JSON
app.use(express.json());

app.post('/feedbacks', async (req,res) => {

  const {type, comment, screenshot} = req.body;

  // Criação de registro no Prisma
  const feedback = await prisma.feedback.create({
    data: {
      type: type,
      comment: comment,
      screenshot: screenshot,
    }
  });

  return res.status(201).json({data:feedback});

});

app.listen(3333, () => {
  console.log('Http server running');
})