import { FastifyInstance, FastifyRequest } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.post(
    '/:sessionId',
    async (
      request: FastifyRequest<{ Params: { sessionId: string } }>
    ) => {
      const { sessionId } = request.params;
      // @ts-ignore
      const response = await fastify.agentService.start(sessionId);
      return { response };
    }
  );
}
