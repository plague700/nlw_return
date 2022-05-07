import express from 'express';
import nodemailer from 'nodemailer';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { prisma } from './prisma';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

routes.post('/feedbacks', async (req,res) => {

  const {type, comment, screenshot} = req.body;

  // Instanciando Prisma Repository
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  // Criação de registro no Prisma / Envio de email
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  // Execução
  const feedback = await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  });

  // Envio de e-mail
  

  return res.status(201).json({data:feedback});

});