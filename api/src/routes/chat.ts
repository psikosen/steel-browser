import { FastifyInstance, FastifyRequest } from 'fastify';
import { OllamaService } from '../services/ollama.service';
import { ollamaConfig } from '../config';

export default async function (fastify: FastifyInstance) {
  const ollamaService = new OllamaService();

  fastify.post(
    '/',
    async (
      request: FastifyRequest<{ Body: { message: string } }>
    ) => {
      const { message } = request.body;
      const response = await ollamaService.generate(message, ollamaConfig.model);
      return { response: response.response };
    }
  );
}
