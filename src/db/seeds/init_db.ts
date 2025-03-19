import { Knex } from "knex";
import * as bcrypt from 'bcrypt';


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex.raw('TRUNCATE TABLE "app_admin" RESTART IDENTITY CASCADE');
    await knex.raw('TRUNCATE TABLE "super_admin" RESTART IDENTITY CASCADE');
    await knex.raw('TRUNCATE TABLE "app" RESTART IDENTITY CASCADE');
    await knex.raw('TRUNCATE TABLE "users" RESTART IDENTITY CASCADE');
    await knex.raw('TRUNCATE TABLE "roles" RESTART IDENTITY CASCADE');
    await knex.raw('TRUNCATE TABLE "user_role" RESTART IDENTITY');

    // Inserts seed entries
    await knex("super_admin").insert([{
        email: 'superAdmin@mail.ru',
        password: await bcrypt.hash('qwerty', 10),
    }]);
    await knex("app_admin").insert([{
        email: 'appAdmin1@mail.ru',
        password: await bcrypt.hash('qwerty', 10),
    }]);
    await knex("app_admin").insert([{
        email: 'appAdmin2@mail.ru',
        password: await bcrypt.hash('qwerty', 10),
    }]);
    await knex("app_admin").insert([{
        email: 'appAdmin3@mail.ru',
        password: await bcrypt.hash('qwerty', 10),
    }]);
    await knex("app").insert([{
        owner_id: 1,
        secret: 'qwertyuiop',
        title: 'app1',
    }]);
    await knex("app").insert([{
        owner_id: 2,
        secret: 'qwertyuiopuihoih',
        title: 'app2',
    }]);
    await knex("app").insert([{
        owner_id: 2,
        secret: 'qwertyuiopuihrjnfwefiowek',
        title: 'app3',
    }]);
    await knex("users").insert([{
        app_id: 1,
        email: 'user1@mail.ru',
        password: await bcrypt.hash('qwerty', 10),
        data: {"question": "string1",  "answer": "string1"},
}]);
    await knex("users").insert([{
        app_id: 2,
        email: 'user2@mail.ru',
        password: await bcrypt.hash('qwerty', 10),
        data: {"question": "string1",  "answer": "string1"},
    }]);
    await knex("users").insert([{
        app_id: 2,
        email: 'user3@mail.ru',
        password: await bcrypt.hash('qwerty', 10),
        data: {"question": "string1",  "answer": "string1"},
    }]);
    await knex("roles").insert([{
        title: 'role1',
        app_id: 1,
    }]);
    await knex("roles").insert([{
        title: 'role2',
        app_id: 2,
    }]);
    await knex("roles").insert([{
        title: 'role3',
        app_id: 2,
    }]);
    await knex("user_role").insert([{
        user_id: 1,
        role_id: 1,
    }]);
    await knex("user_role").insert([{
        user_id: 2,
        role_id: 2,
    }]);
};
