import { Router } from 'express';
import * as ticketsController from '../controllers/tickets.controller.js';

const ticketsRouter = Router();

ticketsRouter.get('/', ticketsController.getTickets);
ticketsRouter.get('/create', ticketsController.createTicket);

export default ticketsRouter;
