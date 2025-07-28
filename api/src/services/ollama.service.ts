import { Ollama } from 'ollama';
import { env } from '../env';
import axios from 'axios';
import { AgentService } from './agent.service';

const ollama = new Ollama({ host: env.OLLAMA_HOST });

export class OllamaService {
  constructor(private readonly agentService: AgentService) {}

  async getModels() {
    return ollama.list();
  }

  async generate(prompt: string, model: string, imageUrl?: string) {
    if (imageUrl) {
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });
      const image = Buffer.from(response.data, 'binary');
      return ollama.generate({
        prompt,
        model,
        images: [image],
      });
    }
    return ollama.generate({
      prompt,
      model,
    });
  }
}
