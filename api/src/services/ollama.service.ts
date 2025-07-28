import { Ollama } from 'ollama';
import { env } from '../env';

const ollama = new Ollama({ host: env.OLLAMA_HOST });

export class OllamaService {
  async getModels() {
    return ollama.list();
  }

  async generate(prompt: string, model: string) {
    return ollama.generate({
      prompt,
      model,
    });
  }
}
