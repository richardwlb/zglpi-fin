import knex from 'knex';

export async function up(knex: knex) {
    return knex.schema.createTable('zglpi_entities_hour', table => {
        table.integer('entities_id').primary();
        table.double('hour_value');
    });
}

export async function down(knex: knex){
    return knex.schema.dropTable('zglpi_entities_hour'); 
}   

// npx knex migrate:latest --knexfile knexfile.ts migrate:latest