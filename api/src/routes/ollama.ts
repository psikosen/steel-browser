import { FastifyInstance, FastifyRequest } from 'fastify';
import { OllamaService } from '../services/ollama.service';

export default async function (fastify: FastifyInstance) {
  const ollamaService = new OllamaService();

  fastify.get('/models', async () => {
    return ollamaService.getModels();
  });

  fastify.post(
    '/generate',
    async (
      request: FastifyRequest<{ Body: { prompt: string; model: string } }>
    ) => {
      const { prompt, model } = request.body;
      return ollamaService.generate(prompt, model);
    }
  );
}
