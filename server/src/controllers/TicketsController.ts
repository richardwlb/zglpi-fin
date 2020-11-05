import { Request, Response} from 'express';
import knex from '../database/connection';

class TicketsController {

    async indexHours(req: Request, resp: Response) {

        const {id, dataIni, dataEnd} = req.params;

        console.log('id', id);
        console.log('dataIni', dataIni);
        console.log('dataEnd', dataEnd);

        const hoursValue = await knex('glpi_tickets')
            .select('glpi_tickets.id'
                    , 'glpi_tickets.entities_id'
                    , 'glpi_entities.name as Client'
                    , 'glpi_tickets.name as Ticket'
                    , 'glpi_tickets.date'
                    , 'glpi_tickets.closedate'
                    , 'glpi_tickets.solvedate'
                    , 'zglpi_entities_hour.hour_value')
            .sum('glpi_tickettasks.actiontime as total_time_seconds' )
            .columns([
                knex.raw('sum(glpi_tickettasks.actiontime / 60 / 60) as total_time_hour')
              ])
            .columns([
                knex.raw('sum(glpi_tickettasks.actiontime / 60 / 60) * hour_value as cost')
            ])
            .where('glpi_tickets.entities_id', id)
            .where('glpi_tickets.date', '>=', `${dataIni}T00:00:00.000Z`)
            .where('glpi_tickets.closedate', '<=', `${dataEnd}T00:00:00.000Z`)
            .join('glpi_tickettasks', 'glpi_tickettasks.tickets_id', 'glpi_tickets.id')
            .join('glpi_entities', 'glpi_entities.id', 'glpi_tickets.entities_id')
            .join('zglpi_entities_hour', 'zglpi_entities_hour.entities_id', 'glpi_tickets.entities_id')
            .groupBy('glpi_tickets.id')
            .orderBy('glpi_tickets.name');

        return resp.json(hoursValue);
    }

}

export default TicketsController;


