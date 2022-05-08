import express from 'express';

import { SubmitFeedbackService } from './services/submitFeedbackService';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailerMailAdapter';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot, createdAt } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackService = new SubmitFeedbackService(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackService.execute({
    type,
    comment,
    screenshot,
    createdAt,
  })

  return res.status(201).send();
})