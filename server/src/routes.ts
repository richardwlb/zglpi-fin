import express from 'express';

const routes = express.Router();
import TicketsController from './controllers/TicketsController';
import EntitiesController from './controllers/EntitiesController';

const ticketsController = new TicketsController;
const entitiesController = new EntitiesController;

routes.get('/entities', entitiesController.indexEntities);
routes.get('/entities/:id', entitiesController.showEntitie);
routes.put('/entities/:id', entitiesController.updateEntitie);

routes.get('/hours/:id/:dataIni/:dataEnd', ticketsController.indexHours);

export default routes;