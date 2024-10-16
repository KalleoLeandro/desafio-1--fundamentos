import { randomUUID } from 'crypto';
import { buildRoutePath } from '../utils/build-route-path.js';
import { Database } from '../database/database.js';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const tasks = database.select('tasks');
            return res
                .setHeader('Content-type', 'application/json')
                .end(JSON.stringify(tasks));
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title,
                description } = req.body;

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(),
                updated_at: null
            };
            database.insert('tasks', task);

            return res.writeHead(201).end();
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            database.delete('tasks', req.params.id);
            return res.writeHead(204).end();
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { title,
                description,
            } = req.body;
            database.update('tasks', id, { title, description, updated_at: new Date()});
            return res.writeHead(200).end();
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params;
            database.update('tasks', id, {completed_at: new Date()});
            return res.writeHead(200).end();
        }
    }
]