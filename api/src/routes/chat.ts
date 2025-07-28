import { FastifyInstance, FastifyRequest } from 'fastify';
import { ollamaConfig } from '../config';

export default async function (fastify: FastifyInstance) {
  fastify.post(
    '/',
    async (
      request: FastifyRequest<{ Body: { message: string; imageUrl?: string } }>
    ) => {
      const { message, imageUrl } = request.body;
      const response = await fastify.ollamaService.generate(
        message,
        ollamaConfig.model,
        imageUrl
      );
      return { response: response.response };
    }
  );
}
