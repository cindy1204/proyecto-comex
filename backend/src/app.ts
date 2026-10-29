import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { config } from './config.js';
import { errorHandler, HttpError, notFound } from './middleware/errors.js';
import { authRouter } from './routes/auth.js';
import { catalogRouter } from './routes/catalog.js';
import { contactRouter } from './routes/contact.js';
import { interactionRouter } from './routes/interactions.js';

export const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || config.corsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new HttpError(403, 'CORS_ORIGIN_DENIED', 'El origen no está permitido por CORS.'));
  },
}));
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});
app.use('/api/auth', authRateLimit, authRouter);
app.use('/api/catalogo', catalogRouter);
app.use('/api/contacto', contactRouter);
app.use('/api/interaccion', interactionRouter);
app.use(notFound);
app.use(errorHandler);
