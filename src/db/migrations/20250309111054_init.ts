/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('appAdmin', function (table) {
      table.increments().primary(), table.string('email').unique();
      table.string('password').notNullable();
      table.timestamps(true, true);
    })
    .createTable('app', function (table) {
      table.increments().primary();
      table.integer('owner_id').notNullable();
      table.string('title').unique();
      table.string('secret');
      table
        .foreign('owner_id')
        .references('id')
        .inTable('appAdmin')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('users', function (table) {
      table.increments().primary();
      table.integer('app_id').notNullable();
      table.string('email');
      table.string('password').notNullable();
      table.jsonb('data').notNullable();
      table
        .foreign('app_id')
        .references('id')
        .inTable('app')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('roles', function (table) {
      table.increments().primary();
      table.integer('app_id').notNullable();
      table.string('title');
      table
        .foreign('app_id')
        .references('id')
        .inTable('app')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('superAdmin', function (table) {
      table.increments().primary();
      table.string('email').unique();
      table.string('password').notNullable();
      table.timestamps(true, true);
    })
    .createTable('userRole', function (table) {
      table.integer('user_id').notNullable();
      table.integer('role_id').notNullable();
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table
        .foreign('role_id')
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('appAdmin')
    .dropTableIfExists('users')
    .dropTableIfExists('app')
    .dropTableIfExists('roles')
    .dropTableIfExists('superAdmin')
    .dropTableIfExists('userRole');
};
