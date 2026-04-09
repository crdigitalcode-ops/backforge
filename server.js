import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, 'dist', 'client');

const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: true,
});

if (existsSync(clientDistPath)) {
  await app.register(fastifyStatic, {
    root: clientDistPath,
  });

  app.setNotFoundHandler(async (_request, reply) => {
    if (existsSync(path.join(clientDistPath, 'index.html'))) {
      return reply.code(200).sendFile('index.html');
    }

    return reply.code(404).send({
      error: 'Not Found',
    });
  });
}

app.get('/health', async (_request, reply) => {
  return reply.code(200).send({
    status: 'ok',
  });
});

app.get('/', async (_request, reply) => {
  if (existsSync(path.join(clientDistPath, 'index.html'))) {
    return reply.sendFile('index.html');
  }

  return reply.code(200).send({
    status: 'ok',
    service: 'backforge',
  });
});

app.get('/api/hello', async (_request, reply) => {
  return reply.code(200).send({
    message: 'Hello from Backforge API',
  });
});

const start = async () => {
  try {
    const port = Number(process.env.PORT || 3000);

    await app.listen({
      port,
      host: '0.0.0.0',
    });

    app.log.info(`Server listening on port ${port}`);
  } catch (error) {
    app.log.error(error, 'Failed to start server');
    process.exit(1);
  }
};

start();
