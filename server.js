import { fastify } from "fastify";
// import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";
import 'dotenv/config'

const server = fastify();
const database = new DatabasePostgres();

// POST (cadastrar videos)
server.post('/videos', async (request, reply) =>{
    const body = request.body
    console.log(body)
    await database.create({
        title: body.title,
        description: body.description,
        duration: body.duration
    });

    return reply.status(201).send()
})

server.get('/videos', async (response) =>{
    const search = response.query.search
    return await database.list(search)
})

server.put('/videos/:id', (request, reply) =>{
    const videoID = request.params.id
    const body = request.body
    console.log(body)

    database.update(videoID,{
        title: body.title,
        description: body.description,
        duration: body.duration
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', (request, reply) =>{
    const videoID = request.params.id
    database.delete(videoID)
    
    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 8000
})