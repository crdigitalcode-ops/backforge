import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = Fastify({
  logger: true
});

server.register(cors, {
  origin: '*'
});

server.get('/health', async () => {
  return { status: 'ok' };
});

server.get('/api/hello', async () => {
  return { message: 'Hello from Backforge API' };
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  server.register(fastifyStatic, {
    root: path.join(__dirname, '../client'),
    prefix: '/'
  });

  server.setNotFoundHandler((req, reply) => {
    reply.sendFile('index.html');
  });
}

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Server listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
