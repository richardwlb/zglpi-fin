import { Request, Response} from 'express';
import knex from '../database/connection';

class EntitiesController {

    async indexEntities(req: Request, resp: Response) {
        const entities = await knex('glpi_entities').select('glpi_entities.*');
        return resp.json(entities);
    }

    async showEntitie(req: Request, resp: Response){

        const {id} = req.params;

        const entitie = await knex('glpi_entities')
            .where('id', id)
            .first();

        if (!entitie) {
            return resp.status(400).json({ message: 'Entitie not found.' });
        }

        return resp.json(entitie);  

    }

    async updateEntitie(req: Request, resp: Response){

        const {id} = req.params;

        const {hour_value} = req.body;

        const entitie = await knex('zglpi_entities_hour')
            .where('entities_id', id)
            .first();

        if (!entitie) {
            const updateEntitie = await knex('zglpi_entities_hour')
                .insert( { 'entities_id': id, hour_value });

            return resp.json({ message: updateEntitie}); 
        }

        const updateEntitie = await knex('zglpi_entities_hour')
            .update('hour_value', hour_value)
            .where('entities_id', id);

        return resp.json({ message: updateEntitie});  

    }

}

export default EntitiesController;